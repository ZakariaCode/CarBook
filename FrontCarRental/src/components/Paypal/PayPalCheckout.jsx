import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate, useParams } from "react-router-dom";
import { sendPDFByEmail } from "../../services/Emailing";
import {
  getReservation,
  updateReservation,
  ValideDate
} from "../../services/ReservationService";
import {generateIdContrat} from "../../services/ContratService";
import { getcar } from "../../services/VehiculeService";
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
        console.log("Reservation data:", reservationResponse.data);

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

  const onApprove = async (data,actions) => {
    try {
      console.log("reservation id", reservation.id);
      const orderID = data.orderID;
      const paymentDetails = await actions.order.capture();
      console.log("Payment actions:", paymentDetails);
      console.log("payment data:", data);
      let paymentMethod = "Unknown Method";  

      if (data.paymentSource === "paypal") {
        paymentMethod = "PayPal";
      } else if (data.paymentSource === "card") {
        paymentMethod = "Credit Card";
      }
      if (!car) {
        console.error("Car data is not loaded yet.");
        alert("Car details are not available. Please try again later.");
        return;
      }
      const idContrat = await generateIdContrat();
      const contratResponse = await addContrat({id:idContrat, date: new Date()});
      const contrat = contratResponse.data;
      console.log("Contract created:", contrat);

      const paiementResponse = await addPaiement({
        id: orderID,
        datePaiement: new Date(),
        montant: montant,
        methodePaiement: paymentMethod,
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
        sendPDFByEmail("sawssanatiq@gmail.com", "contrat", {nom: "Zakaria elhajjam",cin: "EE123456",numContrat: contrat.id,marque: `${car.marque} ${car.modele}`,matricule: car.matricule}),
        sendPDFByEmail("sawssanatiq@gmail.com", "facture", {
          montant: montant,
          tarif: car.tarif,
          nom: "Zakaria elhajjam",
          cin: "EE123456",
          nbrjours: ValideDate(reservation.dateDebut, reservation.dateFin).days,
          numContrat: contrat.id,
          marque: car.marque,
          model: car.modele,
          carburant: car.carburant,
          dateDebut: reservation.dateDebut,
          dateFin: reservation.dateFin,
          methodPaiement: paymentMethod,
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
    <div className="flex items-center justify-center h-screen p-4 dark:bg-dark dark:text-white">
      <div className="w-full max-w-md p-6 rounded-lg shadow-xl bg-gray-800/4">
        <h2 className="mb-6 text-2xl font-semibold text-center">
          Complete Your Payment
        </h2>
        <p className="mb-6 text-lg text-center">
          You are about to pay <strong>{montant.toFixed(2)} USD</strong> for
          your reservation.
        </p>
        <PayPalScriptProvider
          options={{
            "client-id":
              "AQ-2Tf9Lg10HZ6Gym6I-xBA4jvzRsO2BrCiblNLKfKAyHFYn4q4fY5-aB_6ooftqHbNKu1TZgFgaU0PK",
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
          <button className="p-2 text-white bg-gray-700 rounded-md hover:bg-gray-600">
            <span className="text-sm">Pay with Credit Card</span>
          </button>
          <button className="p-2 text-white bg-gray-700 rounded-md hover:bg-gray-600">
            <span className="text-sm">PayPal Credit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayPalCheckout;
