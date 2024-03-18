const fs = require('fs');
const pdfjs = require('pdfjs');
const shapeParser = require('./parser/parseShape').shapeParser;
const imageParser = require('./parser/parseImage').imageParser;
const textParser = require('./parser/parseText').textParser;


module.exports = {
    extractGraphicsFromPDF: async function(pdfBuffer) {
        try {
            console.log('pdfService.js extractGraphicsFromPDF() called...');

            // Load the PDF data from the buffer
            const data = new Uint8Array(pdfBuffer);
            console.log('PDF file loaded successfully');

            // Load the PDF document
            const doc = await pdfjs.getDocument({ data });
            console.log('PDF document loaded successfully');

            const graphics = [];

            // Iterate through each page of the PDF
            for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
                // Get the page
                const page = await doc.getPage(pageNum);
                console.log(`Processing page ${pageNum}`);

                // Get the page content
                const content = await page.getOperatorList();

                // Parse different types of content
                // Assuming shapeParser, imageParser, and textParser are already implemented
                const shapes = shapeParser(content);
                const images = imageParser(content);
                const text = textParser(content);

                // Save the parsed content for page
                graphics.push({
                    page: pageNum,
                    shapes,
                    images,
                    text
                });
            }

            console.log('Graphics extracted successfully');
            return graphics;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
};
