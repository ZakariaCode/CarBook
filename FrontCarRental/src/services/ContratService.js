import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/contrat";

export const addContrat = (contrat) =>
    axios.post(REST_API_BASE_URL, contrat);
export const generateIdContrat = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let firstPart = '';
    let secondPart = '';
    const length = 4; // Longueur de chaque partie aléatoire
  
    // Générer la première partie aléatoire
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      firstPart += characters[randomIndex];
    }
  
    // Générer la deuxième partie aléatoire
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      secondPart += characters[randomIndex];
    }
  
    // Obtenir l'année actuelle
    const year = new Date().getFullYear();
  
    // Construire l'ID du contrat avec le format XXXXYYYYXXXX
    return `${firstPart}${year}${secondPart}`;
  };
  