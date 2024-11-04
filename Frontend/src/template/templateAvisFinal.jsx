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

import ItemsTable from "./itemsTble";

// Define styles (unchanged)


const TemplateAvisFinal = ({reference,intitule,investigateurNom,investigateurPrenom,dateSoummission,statut}) => {
 
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
          marginBottom: 15,
          marginTop:10,
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
        imageContainerTable: {
         
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop:13
        },
        imageSignature:{
          marginTop:20,
          textAlign: 'center',
          width: 160, 
          marginBottom:5,
          height: 55,
        },
        imageTable:{
          
          
          
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
          centeredText: {
            textAlign: 'center',           // Center the text horizontally // Add strikethrough effect  
            fontSize: 13, // taille plus grande pour un titre
          fontWeight: 'bold', // texte en gras
          textAlign: 'center', // centrer le texte
        
          marginLeft:70,
          marginRight:70,          // Adjust font size if needed
                        // Add vertical margin if needed
          },
          textIns:{
            fontSize: 10,
            marginBottom: 5,
            marginLeft:10
          }
        
      });
      const data = {
        id: "5df3180a09ea16dc4b95f910",
        items: [
          {
            sr: 1,
            desc: "desc1",
            xyz: 5,
          },
          {
            sr: 2,
            desc: "desc2",
            xyz: 6,
          },
        ],
      };
 

  return (
    <Document>
      <Page size="A4" style={styles.page}>
      
      


        <View >
            <Image style={styles.image} src="/public/img/umpCerbo.jpg" />
        </View>
        <Text style={styles.centeredText}>AVIS DU COMITE D’ETHIQUE POUR LA RECHERCHE 
        BIOMEDICALE D’OUJDA (CERBO)
        </Text>
        <View style={styles.header}>
          <Text>Oujda le <Text style={styles.blueText}>{"dateOf"}</Text></Text>
        </View>
        
        <View style={styles.imageContainerTable} >
          <Image style={styles.imageTable} src="/public/img/titrePvProjet.jpg" />
      </View>
        <View>
          <Text style={styles.textIns}>• Référence : {reference}</Text>
          <Text style={styles.textIns}>• Intitulé : {intitule}</Text>
          <Text style={styles.textIns}>
            • Investigateur(rice) principal(e) : Pr. {investigateurNom} {investigateurPrenom}
          </Text>
        <Text style={styles.textIns}>• Promoteur : {"project.sponsor"}</Text>
          <Text style={styles.textIns}>
            • Début de l’étude : {dateSoummission} &nbsp;&nbsp;&nbsp;
            Durée de l’étude : {"durree"}
          </Text>
        </View>
      
       { statut==="favorable" ? (
        <View style={styles.imageContainerTable} >
          <Image style={styles.imageTable} src="/public/img/DeliberationFavorable.jpg" />
      </View>
       ):
       <View style={styles.imageContainerTable} >
          <Image style={styles.imageTable} src="/public/img/DeliberationDefavorable.jpg" />
      </View>
        }
       <View style={styles.imageContainerTable} >
          <Image style={styles.imageTable} src="/public/img/refTravailComite.jpg" />
      </View> 
      
      <View style={styles.imageContainer} >
          <Image style={styles.imageSignature} src="/public/img/signaturePvFinal.jpg" />
      </View>
     
      <View style={styles.footer} fixed>
           <view style={styles.footerLine}/>
        <Text>Secrétariat : CERBO, Faculté de Médecine et de Pharmacie d’Oujda, Hay al Hikma, BP, 4867, {'\n'} Oujda, 60049, Maroc. Site Web : <Link src="http://fmpo.ump.ma/fr/recherche/comite-dethique" style={styles.link} >http://fmpo.ump.ma/fr/recherche/comite-dethique </Link></Text>
      </View>
      </Page>
    </Document>
  );
};

export default TemplateAvisFinal;
