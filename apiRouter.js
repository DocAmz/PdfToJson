var express = require('express');
var pdfController = require('./routes/pdfController');

var apiRouter = express.Router();

// Upload routes
apiRouter.post('/upload/pdf', pdfController.convertPdfToJson);

module.exports.router = apiRouter;
