import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.post("http://localhost:8080/api/v1/login/reset-password", {
        token: token,
        newPassword: password,
      });

      if (response.data.message) {
        setSuccessMessage("Mot de passe réinitialisé avec succès.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Une erreur s'est produite.");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Réinitialiser votre mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nouveau mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirmer le mot de passe :</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Réinitialiser</button>
      </form>
    </div>
  );
};

export default ResetPassword;
