export const convertByteArrayToFile = (base64, mimeType) => {
  const binaryString = atob(base64);

  // Convert binary string to array buffer
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
  }
  const buffer = byteArray.buffer;

  // Create Blob from buffer with specified MIME type
  const blob = new Blob([buffer], { type: mimeType });

  // Create object URL from Blob
  const url = URL.createObjectURL(blob);

  // Return the URL
  return url;
};
