import React, { useState, useEffect } from 'react';

const SessionInfo = () => {
  const [sessionData, setSessionData] = useState({
    token: null,
    userRole: null,
    clientId: null,
  });

  useEffect(() => {
    // Récupérer les informations stockées
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');
    const clientId = localStorage.getItem('clientId') || sessionStorage.getItem('clientId');

    // Mettre à jour l'état avec les données de session récupérées
    setSessionData({
      token,
      userRole,
      clientId,
    });
  }, []);

  return (
    <div className="pt-24 session-info">
      <h3>Session Information</h3>
      <div>
        <p><strong>Token:</strong> {sessionData.token ? sessionData.token : 'Not available'}</p>
        <p><strong>User Role:</strong> {sessionData.userRole ? sessionData.userRole : 'Not available'}</p>
        <p><strong>Client ID:</strong> {sessionData.clientId ? sessionData.clientId : 'Not available'}</p>
      </div>
    </div>
  );
};

export default SessionInfo;
