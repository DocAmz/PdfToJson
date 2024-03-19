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
          const pdfData = await pdfService.extractGraphicsFromPDF(pdfFile.buffer);

          console.log('PDF data:', pdfData.Pages[0].Fills[0]);

      // Retrieve the path information
      const paths = [];
      for (const page of pdfData.Pages) {
        for (const path of page.HLines) {
          paths.push({
            type: 'line',
            x: path.x,
            y: path.y,
            width: path.w,
            length: path.l,
            color: path.clr ? pdfData.colorDict[path.clr] : '#000000',
          });
        }
        for (const path of page.VLines) {
          paths.push({
            type: 'line',
            x: path.x,
            y: path.y,
            width: path.w,
            length: path.l,
            color: path.clr ? pdfData.colorDict[path.clr] : '#000000',
          });
        }
        for (const fill of page.Fills) {
          paths.push({
            type: 'rect',
            x: fill.x,
            y: fill.y,
            width: fill.w,
            height: fill.h,
            color: fill.clr ? pdfData.colorDict[fill.clr] : '#000000',
          });
        }
      }


      // Send the JSON data back to the client
      res.status(200).json({
        metadata: pdfData.Meta,
        paths: paths,
      });

      console.log('PDF converted to JSON successfully', JSON.stringify({metadata: pdfData.Meta, paths: paths}));
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
};