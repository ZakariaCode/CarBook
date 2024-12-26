import { Page, Text, View, Image, Document, StyleSheet, pdf } from '@react-pdf/renderer';
import logo from '../../assets/logo.png';  // Logo de l'entreprise
import { format } from 'date-fns'; // Pour formater la date

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
    marginBottom: 30,
    textAlign: 'right',
    color: '#333',
  },
  clientInfo: {
    marginTop: 30,
    marginBottom: 30,
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
    marginBottom: 10,
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
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    right: 40,
    fontSize: 10,
    color: '#333',
  },
});

const generateInvoicePDF = async ({ montant, nom, prenom, numContrat, marque }) => {
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
          <Text style={styles.sectionTitle}>Informations du Client</Text>
          <Text style={styles.text}>Nom : {nom} {prenom}</Text>
          <Text style={styles.text}>Numéro de contrat : {numContrat}</Text>
          <Text style={styles.text}>Marque du véhicule : {marque}</Text>
        </View>

        {/* Détails de la facture */}
        <Text style={styles.sectionTitle}>Détails de la Facture</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Montant</Text>
            <Text style={styles.tableCell}>{montant} €</Text>
          </View>
        </View>

        <Text style={styles.footer}>© {new Date().getFullYear()} Car Rental. Tous droits réservés.</Text>
      </Page>
    </Document>
  ).toBlob();
  return blob;
};

export { generateInvoicePDF };
