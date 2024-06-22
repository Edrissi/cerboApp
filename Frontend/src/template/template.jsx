import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';

const ExaminationReport = () => {
  const [pdfSrc, setPdfSrc] = useState(null);

  const generatePDF = () => {
    const element = document.getElementById('contentToConvert');
    html2pdf().from(element).outputPdf('datauristring').then(pdfDataUri => {
      setPdfSrc(pdfDataUri);
    });
  };

  // Sample data to replace placeholders
  const data = {
    champ1: '21 Juin 2024',
    champ2: 'John Doe',
    champ3: '15 Juin 2024',
    champ4: 'Étude sur l\'efficacité des vaccins',
    champ5: '20 Juin 2024',
    commentData: [
      { commentaire: 'Remarque 1' },
      { commentaire: 'Remarque 2' },
      { commentaire: 'Remarque 3' }
    ]
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
      {pdfSrc && (
        <iframe id="pdfViewer" title="PDF Viewer" width="100%" height="600" src={pdfSrc}></iframe>
      )}

      <div id="contentToConvert" style={{margin:45}}>
        {/* PDF Content Template */}
        <div>
          

          <h1 style={{ textAlign: 'center' }}>Comité d’Ethique pour la Recherche Biomédicale d'Oujda</h1>
          <h2 style={{ textAlign: 'center' }}>Faculté de Médecine et de Pharmacie Université Mohammed Premier Oujda</h2>
          
          <p>Oujda le <span style={{ color: 'blue' }}>{data.champ1}</span></p>

          <p>A Monsieur/Madame le Pr. <span style={{ color: 'blue' }}>{data.champ2}</span><br />
          Structure de recherche.</p>

          <p>Professeur,</p>

          <p>Le Comité d’Ethique pour la Recherche Biomédicale d’Oujda (CERBO) a été saisi le <span style={{ color: 'blue' }}>{data.champ3}</span> d’une 
          demande d’avis concernant votre projet de recherche intitulé « <span style={{ color: 'blue' }}>{data.champ4}</span> ».</p>

          <p>Demande classée sous le N° d’ordre : Reference….</p>

          <p>Le comité s’est réuni le <span style={{ color: 'blue' }}>{data.champ5}</span></p>

          <p>Le CERBO a étudié avec beaucoup d’intérêt votre dossier. Afin de vous donner un avis, le comité vous 
          demande de tenir compte des remarques suivantes et lui transmettre les compléments 
          d’informations demandés :</p>

          {data.commentData.map((item, index) => (
            <p key={index}><span style={{ color: 'blue' }}>{index + 1}</span>. {item.commentaire}</p>
          ))}

          <p><strong>En vous remerciant Professeur, veuillez croire en nos salutations chaleureuses.</strong></p>

          <p>Pour le CERBO<br />
          Pr Abdelkader Hakkou<br />
          </p>
          <footer>
            <p>Secrétariat : CERBO, Faculté de Médecine et de Pharmacie d’Oujda, Hay al Hikma, BP, 4867, 
            Oujda, 60049, Maroc. Site Web : <a href="http://fmpo.ump.ma/fr/recherche/comite-dethique">http://fmpo.ump.ma/fr/recherche/comite-dethique</a></p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ExaminationReport;
