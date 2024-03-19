const fs = require('fs');
const { DOMParser, XMLSerializer } = require('@xmldom/xmldom');
const PDFParser = require('pdf2json');

module.exports = {
  extractGraphicsFromPDF: async function(pdfBuffer) {
    try {
      console.log('pdfService.js extractGraphicsFromPDF() called...');

      // Create a new PDFParser instance
      const pdfParser = new PDFParser();

      // Parse the PDF buffer
      pdfParser.parseBuffer(pdfBuffer);

      // Wait for the 'pdfParser_dataReady' event to get the parsed data
      return new Promise((resolve, reject) => {
        pdfParser.on('pdfParser_dataReady', (pdfData) => {
          console.log('PDF converted to JSON successfully');
          resolve(pdfData);
        });

        pdfParser.on('pdfParser_dataError', (errData) => {
          console.error('Error:', errData.parserError);
          reject(errData.parserError);
        });
      });
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
};