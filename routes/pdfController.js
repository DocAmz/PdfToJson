const fs = require('fs');
const pdfService = require('../services/pdfService'); // Import pdfService module

module.exports = {
    convertPdfToJson: async function(req, res) {
        console.log('pdfController.js convertPdfToJson() called...');
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            // Get the uploaded PDF file
            const pdfFile = req.file;
            console.log('📁 pdfFile buffer :::');
            console.log(pdfFile.buffer); // Logging the buffer may be too large to display in one line

            // Load the PDF data from the buffer
            const data = await pdfService.extractGraphicsFromPDF(pdfFile.buffer); // Corrected this line

            // Send the JSON data back to the client
            console.log('PDF converted to JSON successfully');
            res.status(200).json(data); // Changed `pagesData` to `data`
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};