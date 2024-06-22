import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import site from "../../../public/site.pdf"
import "../../../public/css/pdf.css"
class MyPDFViewer extends Component {
  state = {
    error: null
  };

  componentDidCatch(error, info) {
    this.setState({ error });
    console.error('PDF rendering error:', error);
  }

  render() {
    const { error } = this.state;
    const { dataUrl } =this.props;

    if (error) {
      return <div>Error loading PDF: {error.message}</div>;
    }

    return (
        <div>

        <div className="pdf-container">
            <div className="pdf-overlay">
                <iframe src={`${dataUrl}#toolbar=0`} className="pdf-iframe" title="PDF Viewer"></iframe>
            </div>
      </div>
      </div>
      
      
    );
  }
}

export default MyPDFViewer;