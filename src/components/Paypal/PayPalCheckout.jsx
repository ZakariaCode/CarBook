import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate, useParams } from "react-router-dom";
import { sendPDFByEmail } from "../../services/Emailing";
import {
  getReservation,
  updateReservation,
} from "../../services/ReservationService";
import { getcar } from "../../services/VehiculesService";
import { addContrat } from "../../services/ContratService";
import { addPaiement } from "../../services/PaiementService";

function PayPalCheckout() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [car, setCar] = useState(null);
  const Navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get reservation first
        const reservationResponse = await getReservation(id);
        setReservation(reservationResponse.data);
        
        // Get car details only if reservation is loaded
        if (reservationResponse.data && reservationResponse.data.vehiculeId) {
          const carResponse = await getcar(reservationResponse.data.vehiculeId);
          setCar(carResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, [id]);

  const createOrder = (data, actions) => {
    if (!reservation || !reservation.montant) {
      console.error("Reservation is not loaded yet.");
      alert("Reservation details are not available. Please try again later.");
      return;
    }

    return fetch(`http://localhost:8080/paypal/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ total: reservation.montant }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData && responseData.approvalUrl) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: reservation.montant,
                },
              },
            ],
            application_context: {
              brand_name: "My Store",
              user_action: "PAY_NOW",
            },
          });
        } else {
          throw new Error("Approval URL not found.");
        }
      })
      .catch((error) => {
        console.error("Error in createOrder:", error);
        alert("Failed to create PayPal order.");
      });
  };

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      const orderID = data.orderID;
      const payerId = String(data.payerID);

      // Ensure car data is available before proceeding
      if (!car) {
        console.error("Car data is not loaded yet.");
        alert("Car details are not available. Please try again later.");
        return;
      }

      // Create a contrat
      const contratResponse = await addContrat({ date: new Date() });
      const contrat = contratResponse.data;
      console.log("paiement id", orderID);

      const paiementResponse = await addPaiement({
        id: orderID,
        datePaiement: new Date(),
        methodePaiement: "Paypal",
      });
      const paiement = paiementResponse.data;

      console.log("id", reservation.id);
      console.log("dateDebut", reservation.dateDebut);
      console.log("dateFin", reservation.dateFin);
      console.log("montant", reservation.montant);
      console.log("vehiculeId", reservation.vehiculeId);
      console.log("clientId", reservation.clientId);
      console.log("paiementId", paiement.id);
      console.log("contratId", contrat.id);

      const updatedReservationResponse = await updateReservation({
        id: reservation.id,
        dateDebut: reservation.dateDebut,
        dateFin: reservation.dateFin,
        montant: reservation.montant,
        vehiculeId: reservation.vehiculeId,
        clientId: reservation.clientId,
        paiementId: paiement.id,
        contratId: contrat.id,
      });

      const updatedReservation = updatedReservationResponse.data;

      console.log("Contrat", contrat);
      console.log("Paiement", paiement);
      console.log("Reservation", updatedReservation);
      console.log("Order ID", orderID);
      console.log("Payer ID", payerId);

      sendPDFByEmail("elhajjamzakaria1@gmail.com", "contrat", {});
      sendPDFByEmail("elhajjamzakaria1@gmail.com", "facture", {
        montant: reservation.montant,
        nom: "Zakaria",
        prenom: "Elhajjam",
        numContrat: contrat.id,
        marque: car ? `${car.marque} ${car.modele}` : "Car details unavailable",
      });

      Navigate("/vehicules", { state: { showAvisModal: true } });
    } catch (error) {
      console.error("Error during PayPal checkout:", error);
      alert("An error occurred while processing your payment.");
    }
  };

  if (!reservation || !car) {
    return <p>Loading reservation and car details...</p>;
  }

  return (
    <div className="h-screen dark:bg-dark dark:text-white flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-gray-800/4 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Complete Your Payment
        </h2>
        <p className="text-center text-lg mb-6">
          You are about to pay <strong>{reservation.montant} USD</strong> for
          your reservation.
        </p>
        <PayPalScriptProvider
          className="my-24"
          options={{
            "client-id":
              "AX4fqp9gpqEsrNj0-pXpBmlrmTfZySnc0rxuUz9VOkpSjnozIHfoRKApP1xPlo54LZ4ImrXC0VPJ5xZy",
            components: "buttons",
            currency: "USD",
          }}
        >
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            style={{
              layout: "vertical",
              height: 55,
              color: "gold",
              shape: "pill",
            }}
          />
        </PayPalScriptProvider>
        <div className="flex justify-between mt-4">
          <button className="bg-gray-700 text-white p-2 rounded-md hover:bg-gray-600">
            <span className="text-sm">Pay with Credit Card</span>
          </button>
          <button className="bg-gray-700 text-white p-2 rounded-md hover:bg-gray-600">
            <span className="text-sm">PayPal Credit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayPalCheckout;
