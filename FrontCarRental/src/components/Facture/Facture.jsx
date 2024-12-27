import { Page, Text, View, Image, Document, StyleSheet, pdf } from '@react-pdf/renderer';
import logo from '../../assets/logo.png';
import { format } from 'date-fns'; // Pour formater la date
import { FaUser, FaCar, FaCalendarDay, FaCreditCard, FaBuilding } from 'react-icons/fa'; // Icônes de React (ajoutez ces icônes ou utilisez des alternatives)

// Style de base
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#fef6e4',
  },
  logoContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  titleContainer: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffc727',
  },
  subTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 30,
  },
  date: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'right',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffc727',
    marginBottom: 10,
    textDecoration: 'underline',
  },
  text: {
    fontSize: 12,
    lineHeight: 1.6,
    color: '#333',
    marginBottom: 8,
  },
  clientInfo: {
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
    fontSize: 16,
    color: '#ffc727',
  },
  table: {
    marginTop: 20,
    width: '100%',
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #ccc',
    paddingBottom: 8,
    paddingTop: 8,
  },
  tableCell: {
    width: '25%',
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    padding: 5,
  },
  tableHeader: {
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    right: 40,
    fontSize: 10,
    color: '#333',
  },
});

const generateInvoicePDF = async ({
  montant, tarif, nom, cin, nbrjours, numContrat, marque, model, carburant, dateDebut, dateFin, methodPaiement
}) => {
  const blob = await pdf(
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} src={logo} />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Facture - Car Rental</Text>
          <Text style={styles.subTitle}>Location de véhicule</Text>
        </View>

        <Text style={styles.date}>{`Date : ${format(new Date(), 'dd/MM/yyyy')}`}</Text>

        {/* Informations client */}
        <View style={styles.clientInfo}>
          <Text style={styles.sectionTitle}>
            <FaUser style={styles.icon} /> Informations du Client
          </Text>
          <Text style={styles.text}><FaUser style={styles.icon} /> Nom : {nom}</Text>
          <Text style={styles.text}><FaCreditCard style={styles.icon} /> CIN : {cin}</Text>
          <Text style={styles.text}><FaBuilding style={styles.icon} /> Numéro de contrat : {numContrat}</Text>
        </View>

        {/* Informations véhicule */}
        <View style={styles.clientInfo}>
          <Text style={styles.sectionTitle}>
            <FaCar style={styles.icon} /> Informations du Véhicule
          </Text>
          <Text style={styles.text}><FaCar style={styles.icon} /> Marque : {marque}</Text>
          <Text style={styles.text}><FaCar style={styles.icon} /> Modèle : {model}</Text>
          <Text style={styles.text}><FaCar style={styles.icon} /> Carburant : {carburant}</Text>
        </View>

        {/* Détails de la facture */}
        <Text style={styles.sectionTitle}>Détails de la Facture</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableHeader]}>Description</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>Montant</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Tarif journalier</Text>
            <Text style={styles.tableCell}>{tarif} USD</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Nombre de jours</Text>
            <Text style={styles.tableCell}>{nbrjours}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Montant total</Text>
            <Text style={styles.tableCell}>{montant} USD</Text>
          </View>
        </View>

        <Text style={styles.footer}>© {new Date().getFullYear()} Car Rental. Tous droits réservés.</Text>
      </Page>
    </Document>
  ).toBlob();

  return blob;
};

export { generateInvoicePDF };
