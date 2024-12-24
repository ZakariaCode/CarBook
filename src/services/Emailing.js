import axios from 'axios';
import { generatePDFBlob } from '../components/Contrat/Contrat';
import { generateInvoicePDF } from '../components/Facture/Facture';

export const sendPDFByEmail = async (email, pdfType = 'contrat', pdfData = {}) => {
  try {
    let pdfBlob;
    if (pdfType === 'facture') {
      const { montant, nom, prenom, numContrat, marque } = pdfData;
      pdfBlob = await generateInvoicePDF({ montant, nom, prenom, numContrat, marque });
    } else {
      pdfBlob = await generatePDFBlob();
    }
    const formData = new FormData();
    formData.append('pdf', pdfBlob, `${pdfType}.pdf`);
    formData.append('email', email);
    formData.append('document', pdfType);
    await axios.post('http://localhost:8080/email/send-pdf', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error) {
    console.error(error);
  }
};