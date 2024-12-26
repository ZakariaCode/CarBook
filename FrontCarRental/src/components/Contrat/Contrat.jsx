import { Page, Text, View, Image, Document, StyleSheet, pdf } from '@react-pdf/renderer';
import logo from '../../assets/logo.png';
import signature from '../../assets/signature.png';

// // Simuler un compteur pour les numéros de contrat
// let contractCounter = 1000; // Début de la numérotation

// // Fonction pour générer un numéro de contrat séquentiel
// const generateContractNumber = () => {
//   contractCounter += 1; // Incrémentation du compteur
//   return `CONTRAT-${contractCounter}`; // Format : CONTRAT-1001
// };

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
  contractNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  regulations: {
    marginTop: 20,
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
  signatureBlock: {
    marginTop: 50,
    textAlign: 'center',
    alignItems: 'center',
  },
  signatureTitle: {
    marginBottom: 10,
  },
  signatureImage: {
    width: 150,
    height: 60,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    right: 40,
    fontSize: 10,
    color: '#333',
  },
});

const generatePDFBlob = async () => {
  // const contractNumber = generateContractNumber(); 

  const blob = await pdf(
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} src={logo} />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Car Rental</Text>
          <Text style={styles.subTitle}>Contrat de service de location de voitures</Text>
        </View>

        <Text style={styles.date}>{`Date : ${new Date().toLocaleDateString()}`}</Text>
        
        {/* <Text style={styles.contractNumber}>Numéro du contrat : {contractNumber}</Text> Affichage du numéro de contrat */}

        <View style={styles.regulations}>
          <Text style={styles.sectionTitle}>Conditions Générales</Text>
          <Text style={styles.text}>
            1. Le locataire est tenu de restituer le véhicule à la date et à l`heure convenues. Tout retard entraînera des frais supplémentaires.
          </Text>
          <Text style={styles.text}>
            2. Le locataire est responsable de tout dommage causé au véhicule pendant la durée de la location.
          </Text>
          <Text style={styles.text}>
            3. Le carburant utilisé pendant la location est à la charge du locataire.
          </Text>
          <Text style={styles.text}>
            4. Le véhicule doit être restitué propre, et tous les effets personnels doivent être retirés avant la restitution.
          </Text>
          <Text style={styles.text}>
            5. L`assurance ne couvre pas les actes de négligence ou les infractions au code de la route.
          </Text>
          <Text style={styles.text}>
            6. En cas de panne, le locataire doit contacter immédiatement l`agence pour obtenir de l`assistance.
          </Text>
          <Text style={styles.text}>
            7. Toute modification du contrat doit être communiquée à l`agence et approuvée par écrit.
          </Text>
          <Text style={styles.text}>
            8. Le locataire doit vérifier le véhicule pour s`assurer qu`il est en bon état au moment de la réception.
          </Text>
          <Text style={styles.text}>
            9. L`utilisation du véhicule en dehors des frontières autorisées est strictement interdite.
          </Text>
        </View>

        <View style={styles.signatureBlock}>
          <Text style={[styles.sectionTitle, styles.signatureTitle]}>
            Signature de l`Agence
          </Text>
          <Image style={styles.signatureImage} src={signature} />
        </View>

        <Text style={styles.footer}>© {new Date().getFullYear()} Car Rental. Tous droits réservés.</Text>
      </Page>
    </Document>
  ).toBlob();

  return blob;
};

export { generatePDFBlob };
