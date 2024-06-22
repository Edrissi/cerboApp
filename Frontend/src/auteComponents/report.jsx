import React, { useEffect, useRef } from 'react';
import WebViewer from '@pdftron/webviewer';

const PDFGenerator = ({ documentPath }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    const convertToPDF = async () => {
      try {
        const instance = await WebViewer({
          path: 'webviewer/lib', // path to the WebViewer lib
        }, viewerRef.current); // Attach to a hidden element

        const { Core } = instance;

        if (true) {
          const buffer = await Core.office2PDFBuffer("../../public/rapport.jsx", {
            officeOptions: {
              templateValues: {
                // keys and values here
              }
            }
          });

          saveByteArray('rapport.pdf', buffer);
        }
      } catch (error) {
        console.error('Error converting document to PDF buffer:', error);
      }
    };

    convertToPDF();
  }, [documentPath]);

  // Function to save byte array as a file
  const saveByteArray = (reportName, byte) => {
    const blob = new Blob([byte], { type: "application/pdf" });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = reportName;
    link.click();
  };

  return (
    <div ref={viewerRef} style={{ display: 'none' }}></div> // Hidden div
  );
};

export default PDFGenerator;
