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


// Define styles (unchanged)


const TemplateAvisFinal = () => {
 
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
          width: 100, 
          height: 80,
        },
        text: {
            fontSize: 10,
            marginBottom: 5,
          },
          deliberation: {
            fontSize: 12,
            marginBottom: 15,
            fontWeight: "bold",
          },
          sectionTitle: {
            fontSize: 12,
            marginBottom: 10,
            fontWeight: "bold",
          },
        
      });

 

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View >
            <Image style={styles.image} src="/public/img/umpCerbo.jpg" />
        </View>
        <View style={styles.header}>
          <Text>Oujda le <Text style={styles.blueText}>{"dateOf"}</Text></Text>
        </View>

        
        <View style={styles.imageContainer} >
            <Image style={styles.image1} src="/public/img/cerboSignature.jpg" />
        </View>

        <View>
          <Text style={styles.sectionTitle}>Titre et références du projet de recherche</Text>
          <Text style={styles.text}>• Référence : {"project.reference"}</Text>
          <Text style={styles.text}>• Intitulé : {"project.title"}</Text>
          <Text style={styles.text}>
            • Investigateur(rice) principal(e) : Pr. {"project.investigator"}
          </Text>
          <Text style={styles.text}>• Promoteur : {"project.sponsor"}</Text>
          <Text style={styles.text}>
            • Début de l’étude : {"project.startDate"} &nbsp;&nbsp;&nbsp;
            Durée de l’étude : {"project.duration"}
          </Text>
        </View>

        <View>
          <Text style={styles.deliberation}>Délibération</Text>
          <Text style={styles.text}>
            Après examen et évaluation, le Comité d’Ethique (CERBO) a adopté à
            l’unanimité la délibération suivante :
          </Text>
          <Text style={styles.deliberation}>Avis favorable</Text>
          <Text style={styles.text}>
            à la réalisation du projet de recherche sus-référencé et cet avis ne
            sera valable que pour ce projet.
          </Text>
          <Text style={styles.text}>
            L’investigateur(rice) principal(e) est prié(e) d’informer le CERBO :
          </Text>
          <Text style={styles.text}>
            • De tous les incidents ou accidents éventuels survenus pendant
            l’exécution des activités de recherche de ce projet ;
          </Text>
          <Text style={styles.text}>
            • De la clôture de l’étude avec un rapport succinct sur son
            déroulement.
          </Text>
        </View>

    <View style={styles.footer}>
        <view style={styles.footerLine}/>
        <Text>Secrétariat : CERBO, Faculté de Médecine et de Pharmacie d’Oujda, Hay al Hikma, BP, 4867, {'\n'} Oujda, 60049, Maroc. Site Web : <Link src="http://fmpo.ump.ma/fr/recherche/comite-dethique" style={styles.link} >http://fmpo.ump.ma/fr/recherche/comite-dethique </Link></Text>
      </View>
      </Page>
    </Document>
  );
};

export default TemplateAvisFinal;
