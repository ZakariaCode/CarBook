import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate, useParams } from "react-router-dom";
import { sendPDFByEmail } from "../../services/Emailing";
import {
  getReservation,
  updateReservation,
  ValideDate
} from "../../services/ReservationService";
import { getcar } from "../../services/VehiculesService";
import { addContrat } from "../../services/ContratService";
import { addPaiement } from "../../services/PaiementService";

function PayPalCheckout() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [car, setCar] = useState(null);
  const [montant, setMontant] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservationResponse = await getReservation(id);
        setReservation(reservationResponse.data);

        if (reservationResponse.data?.vehiculeId) {
          const carResponse = await getcar(reservationResponse.data.vehiculeId);
          setCar(carResponse.data);

          const diffDays = ValideDate(
            reservationResponse.data.dateDebut,
            reservationResponse.data.dateFin
          );
          const calculatedMontant = carResponse.data.tarif * diffDays.days;
          setMontant(calculatedMontant);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const createOrder = async (data, actions) => {
    if (!reservation || montant <= 0) {
      console.error("Invalid reservation or montant.", { reservation, montant });
      alert("Invalid reservation details or amount. Please try again later.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/paypal/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ total: montant }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const responseData = await response.json();
      console.log("Payment data:", responseData);

      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: montant.toFixed(2),
            },
          },
        ],
        application_context: {
          brand_name: "My Store",
          user_action: "PAY_NOW",
        },
      });
    } catch (error) {
      console.error("Error in createOrder:", error);
      alert("Failed to create PayPal order: " + error.message);
    }
  };

  const onApprove = async (data) => {
    try {
      const orderID = data.orderID;
      const payerId = String(data.payerID);

      if (!car) {
        console.error("Car data is not loaded yet.");
        alert("Car details are not available. Please try again later.");
        return;
      }

      const contratResponse = await addContrat({ date: new Date() });
      const contrat = contratResponse.data;
      console.log("Contract created:", contrat);

      const paiementResponse = await addPaiement({
        id: orderID,
        datePaiement: new Date(),
        montant: montant,
        methodePaiement: "Paypal",
      });
      const paiement = paiementResponse.data;
      console.log("Payment created:", paiement);

      const updatedReservationResponse = await updateReservation({
        id: reservation.id,
        dateDebut: reservation.dateDebut,
        dateFin: reservation.dateFin,
        vehiculeId: reservation.vehiculeId,
        clientId: reservation.clientId,
        paiementId: paiement.id,
        contratId: contrat.id,
      });

      console.log("Reservation updated:", updatedReservationResponse.data);

      await Promise.all([
        sendPDFByEmail("elhajjamzakaria1@gmail.com", "contrat", {}),
        sendPDFByEmail("elhajjamzakaria1@gmail.com", "facture", {
          montant: montant,
          nom: "Zakaria",
          prenom: "Elhajjam",
          numContrat: contrat.id,
          marque: `${car.marque} ${car.modele}`,
        }),
      ]);

      navigate("/vehicules", { state: { showAvisModal: true } });
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
          You are about to pay <strong>{montant.toFixed(2)} USD</strong> for
          your reservation.
        </p>
        <PayPalScriptProvider
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
