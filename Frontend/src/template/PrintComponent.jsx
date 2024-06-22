import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
   Image,
} from "@react-pdf/renderer";

// Define invoice data (unchanged)
const invoiceData = {
  
};

// Define styles (unchanged)
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFF",
    padding:76,
    paddingTop:40,
    
    
  },
  image:{
    padding:0,
    marginBottom:20,
  },
  link: {
    color: 'blue',
    textDecoration: 'underline',
  },
  font1:{
    
    fontStyle:"bold",
  },
  header: {
    fontSize: 10,
    textAlign: "right",
    marginBottom: 30,
    marginTop:20,
    fontWeight: 800,
  },
  header3: {
    fontSize: 10,
    textAlign: "left",
    marginBottom: 10,
    fontWeight: 800,
    
  },
  header4: {
    fontSize: 10,
    textAlign: "left",
    marginBottom: 6,
    fontWeight: 800,
  },
  header5: {
    marginTop:15,
    fontSize: 10,
    textAlign: "left",
    marginBottom: 6,
    fontWeight: 800,
    
  },
  header2: {
    color:"#000000",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "bold",
    
  },
  footerLine: {
    borderTop: 3, // Border top to create a line
    borderColor: '#CD5C5C', // Color of the line
    marginTop: 5, // Margin top to separate line from content
    marginBottom:10,
    marginLeft: 70, // Left margin for the line
    marginRight: 70,
  },
  blueText:{
    color:"blue",
  },
  footer: {
    position: 'absolute',
    color:"black",
    bottom: 30,
    left: 20,
    right: 20,
    textAlign: 'center',
    fontSize: 10,
    
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  image1:{
    marginTop:20,
    textAlign: 'center',
    width: 151, 
    height: 113,
  },
  
});

const InvoiceDocument = ({commentData,dateOf,invis,intitule}) => {
  console.log(commentData)
  

 

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View >
            <Image style={styles.image} src="/public/img/umpCerbo.jpg" />
        </View>
        <View style={styles.header}>
          <Text>Oujda le <Text style={styles.blueText}>{dateOf}</Text></Text>
        </View>

        <View style={styles.header2} >
          <Text  > A Monsieur/Madame le Pr.<Text style={styles.blueText} >{invis}</Text>.
              {'\n'} Structure de recherche. 
        </Text>
        </View>

        <View style={styles.header3}>
          <Text>Professeur,</Text>
        </View>

        <View style={styles.header3}>
          <Text>Le Comité d’Ethique pour la Recherche Biomédicale d’Oujda (CERBO) a été saisi le ………….. d’une demande d’avis concernant votre projet de recherche intitulé « <Text style={styles.blueText} >{intitule}</Text>. ».</Text>
        </View>

        <View style={styles.header3}>
          <Text>Demande classée sous le N° d’ordre : Reference </Text>
        </View>

        <View style={styles.header3}>
          <Text>Le comité s’est réuni le <Text style={styles.blueText}>{dateOf}</Text></Text>
        </View>

        <View style={styles.header3}>
          <Text style={styles.font1}>Le CERBO a étudié avec beaucoup d’intérêt votre dossier. Afin de vous donner un avis, le comité vous demande de tenir compte des remarques suivantes et lui transmettre les compléments d’informations demandés :</Text>
        </View>
       
        {commentData.map((item, index) => (
          <View key={index}> {/* Use a unique identifier if available */}
            <View>

              <Text style={styles.header4}><Text style={styles.blueText} >{index+1}</Text>. {item.commentaire}</Text>
            </View>
          </View>
        ))}


        <View style={styles.header5}>
          <Text style={{ fontWeight: 'bold' }}>En vous remerciant Professeur, veuillez croire en nos salutations chaleureuses.</Text>
        </View>

        <View style={styles.imageContainer} >
            <Image style={styles.image1} src="/public/img/cerboSignature.jpg" />
        </View>

    <View style={styles.footer}>
        <view style={styles.footerLine}/>
        <Text>Secrétariat : CERBO, Faculté de Médecine et de Pharmacie d’Oujda, Hay al Hikma, BP, 4867, {'\n'} Oujda, 60049, Maroc. Site Web : <Link src="http://fmpo.ump.ma/fr/recherche/comite-dethique" style={styles.link} >http://fmpo.ump.ma/fr/recherche/comite-dethique </Link></Text>
      </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
