import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const token = searchParams.get("token"); // Récupérer le token depuis l'URL

    try {
      const response = await fetch("http://localhost:8080/api/v1/login/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          newPassword: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          setSuccessMessage("Mot de passe réinitialisé avec succès.");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Une erreur s'est produite.");
      }
    } catch (err) {
      setError("Impossible de communiquer avec le serveur.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Réinitialiser votre mot de passe</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nouveau mot de passe :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe :</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}
          <button
            type="submit"
            className="bg-customYellow text-white py-2 px-4 rounded w-full hover:bg-yellow-600"
          >
            Réinitialiser
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
