

export const convertByteArrayToPdf = (base64, fileName) => {
    const binaryString = atob(base64);
  
  // Convert binary string to array buffer
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
  }
  const buffer = byteArray.buffer;
  
  // Create Blob from buffer
  const blob = new Blob([buffer], { type: 'application/pdf' });
  
  // Create object URL from Blob
  const url = URL.createObjectURL(blob);
  
  // Open the PDF in a new tab
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'download.pdf'; // Set default file name if not provided
    document.body.appendChild(a);
  
    // Trigger a click on the anchor element to initiate the download
    a.click();
  
  
    // Remove the anchor element and revoke the Object URL to free up resources
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };