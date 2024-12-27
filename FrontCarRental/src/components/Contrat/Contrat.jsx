import { Page, Text, View, Image, Document, StyleSheet, pdf } from '@react-pdf/renderer';
import logo from '../../assets/logo.png';
import signature from '../../assets/signature.png';
import regulationsData from './Reglement.json';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#fef6e4',
    fontFamily: 'Helvetica',
    fontSize: 10,
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
    marginTop: 70,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffc727',
  },
  subTitle: {
    fontSize: 13,
    color: '#555',
    marginBottom: 18,
  },
  date: {
    fontSize: 11,
    marginBottom: 15,
    textAlign: 'right',
    color: '#333',
  },
  contractNumber: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  userDetails: {
    fontSize: 10,
    color: '#333',
    marginBottom: 12,
    lineHeight: 1.6,
  },
  userDetailText: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffc727',
    marginBottom: 12,
    textDecoration: 'underline',
  },
  text: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#333',
    marginBottom: 8,
  },
  signatureBlock: {
    marginTop: 25,
    textAlign: 'center',
    alignItems: 'center',
  },
  signatureTitle: {
    marginBottom: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  signatureImage: {
    width: 160,
    height: 70,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    fontSize: 9,
    color: '#333',
    width: '100%',
    textAlign: 'center',
  },
  regulations: {
    marginTop: 12,
  },
});

const generatePDFBlob = async ({ nom, cin, numContrat, marque, matricule }) => {
  const blob = await pdf(
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} src={logo} />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Contrat de Location de Véhicule</Text>
          <Text style={styles.subTitle}>Conditions et Engagements</Text>
        </View>

        <Text style={styles.date}>{`Date: ${new Date().toLocaleDateString()}`}</Text>
        <Text style={styles.contractNumber}>{`Numéro de Contrat: ${numContrat}`}</Text>

        <View style={styles.userDetails}>
          <Text style={styles.sectionTitle}>Informations du Client</Text>
          <Text style={styles.userDetailText}>{`Nom: ${nom}`}</Text>
          <Text style={styles.userDetailText}>{`CIN: ${cin}`}</Text>
        </View>

        <View style={styles.userDetails}>
          <Text style={styles.sectionTitle}>Informations du Véhicule</Text>
          <Text style={styles.userDetailText}>{`Marque: ${marque}`}</Text>
          <Text style={styles.userDetailText}>{`Matricule: ${matricule}`}</Text>
        </View>

        <View style={styles.regulations}>
          <Text style={styles.sectionTitle}>Conditions Générales</Text>
          {regulationsData.conditions.map((condition, index) => (
            <Text key={index} style={styles.text}>
              {index + 1}. {condition}
            </Text>
          ))}
        </View>

        <View style={styles.signatureBlock}>
          <Text style={styles.signatureTitle}>Signature de l'Agence</Text>
          <Image style={styles.signatureImage} src={signature} />
        </View>

        <Text style={styles.footer}>© {new Date().getFullYear()} Car Rental. Tous droits réservés.</Text>
      </Page>
    </Document>
  ).toBlob();

  return blob;
};

export { generatePDFBlob };
