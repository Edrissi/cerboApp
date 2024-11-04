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
   Svg,
   Line,
} from "@react-pdf/renderer";


// Define styles (unchanged)


const TemplatePvReunion = ({dateSession,dateReunion,membresPresents,projets}) => {
    
    const styles = StyleSheet.create({
    page: { padding: 60 },
    centeredText: {
      textAlign: 'center',           // Center the text horizontally // Add strikethrough effect
      fontSize: 16,   
          fontWeight: '100',             // Adjust font size if needed
                  // Add vertical margin if needed
    },
    centeredLineContainer: {
      display: 'flex',
      alignItems: 'center', // Centers the line horizontally
        // Optional: Add vertical margin if needed
    },
    textSize:{
      fontSize: 11, 
      marginBottom:10,
      
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
      footerLine: {
        borderTop: 3, // Border top to create a line
        borderColor: '#CD5C5C', // Color of the line
        marginTop: 5, // Margin top to separate line from content
        marginBottom:10,
        marginLeft: 70, // Left margin for the line
        marginRight: 70,
      },
      image:{
        padding:0,
        marginBottom:20,
      },
      row: {
        display: 'flex',
        flexDirection: 'row',    // Arrange items in a row
        justifyContent: 'space-between', // Space items evenly
        paddingLeft:15,
        paddingBottom:5,
         alignItems: 'center',
             // Optional: Adjust vertical margin if needed
      },
      columnText: {
        paddingHorizontal:5,
        flex:1,
        fontSize: 10,            // Adjust font size as needed
        fontWeight: 'bold',      // Optional: Make text bold
      },
      refText: {
       
        flex:1,
        fontSize: 10,            // Adjust font size as needed
        fontWeight: 'bold',  // Smaller width for "Réf" column
    },
    textinfo:{
      flex:1,
      fontsize:9,
      fontWeight: 'bold',

    },
      intituleText: {
        fontSize: 9,
        flex: 2, // Make this column a bit wider if needed
         // Define a max width or use percentage-based width
        numberOfLines: 1, // Limits the number of lines to 1
        ellipsizeMode: 'tail', // Truncates text with ellipsis (…) if it exceeds the width
    },
    
  });
  
  
  
  console.log(membresPresents)
  return (
    <Document>
      <Page style={styles.page} size="A4">
      <View >
            <Image style={styles.image} src="/public/img/umpCerbo.jpg" />
        </View>
        <Text style={styles.centeredText}>PV De Réunion CERBO</Text>
        <View style={styles.centeredLineContainer}>
        <Svg  height="30" width="800">
            <Line x1="250" y1="5" x2="550" y2="5" strokeWidth={4} stroke="rgb(0,0,0)" />
        </Svg></View>
        
        <Text style={styles.textSize}>Session : {dateSession}</Text>
        <Text style={styles.textSize}>Date de Réunion : {dateReunion}</Text>
        <Text style={styles.textSize}>Membres CERBO Présents :</Text>

       {membresPresents?.map((item, index) => (
          <View key={index}> {/* Use a unique identifier if available */}
            <View>
               <Text style={styles.textSize}>- {item.nom} {item.prenom}</Text>
            </View>
          </View>
        ))}
   
        <Text style={styles.textSize}>Nouveaux Projets examinés :</Text>

        <View style={styles.row}>
            <Text style={styles.refText}>Réf</Text>
            <Text style={styles.intituleText}>Intitulé</Text>
            <Text style={styles.columnText}>Investigateur </Text>
            <Text style={styles.columnText}>Décision</Text>
        </View>
        
        <Svg  height="10" width="800">
            <Line x1="10" y1="5" x2="470" y2="5" strokeWidth={1} stroke="rgb(0,0,0)" />
        </Svg>
        {projets?.map((item, index) => (
        <View key={index} style={styles.row}>
            <Text style={styles.columnText}>{item.ref}</Text>
            <Text style={styles.intituleText}>{item.intituleProjet}</Text>
            <Text style={styles.columnText}>{item.investigateur.nom} {item.investigateur.prenom}</Text>
            <Text style={styles.columnText}>Décision</Text>
        </View>
        ))}
        <Text style={styles.textSize}>Réponses investigateurs :</Text>

        <View style={styles.row}>
            <Text style={styles.refText}>Réf</Text>
            <Text style={styles.intituleText}>Intitulé</Text>
            <Text style={styles.columnText}>Investigateur</Text>
            <Text style={styles.columnText}>Décision</Text>
        </View>
        <Svg  height="10" width="800">
            <Line x1="10" y1="5" x2="470" y2="5" strokeWidth={1} stroke="rgb(0,0,0)" />
        </Svg>
        <View style={styles.row}>
            <Text style={styles.refText}>Réf</Text>
            <Text style={styles.intituleText}>iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
            </Text>
            <Text style={styles.columnText}>Investigateur Principal</Text>
            <Text style={styles.columnText}>Décision</Text>
        </View>
        
        
        
        
        
        
        
        
        
        <View style={styles.footer} fixed>
        <View style={styles.footerLine}/>
        <Text fixed>Secrétariat : CERBO, Faculté de Médecine et de Pharmacie d’Oujda, Hay al Hikma, BP, 4867, {'\n'} Oujda, 60049, Maroc. Site Web : <Link src="http://fmpo.ump.ma/fr/recherche/comite-dethique" style={styles.link} >http://fmpo.ump.ma/fr/recherche/comite-dethique </Link></Text>
      </View>
      </Page>
    </Document>
  );
};
  export default TemplatePvReunion;
  