// Load environment variables from .env file
require('dotenv').config();

// Imports
var express     = require('express');
var bodyParser  = require('body-parser');
var apiRouter   = require('./apiRouter').router;
var multer      = require('multer');
var cors        = require('cors');

// Instantiate server
var server = express();

// Configure multer middleware to accept only PDF files
const pdfUpload = multer({
  limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB max file size
      files: 1 // Only accept one file
  },
  fileFilter: function(req, file, cb) {
      if (file.mimetype !== 'application/pdf') {
          return cb(new Error('Only PDF files are allowed'));
      }
      cb(null, true);
  }
}).single('file'); // 'pdf' is the field name for the PDF file

// Middleware to handle PDF file uploads
server.use(function(req, res, next) {
  pdfUpload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
          // A multer error occurred (e.g., file size limit exceeded)
          return res.status(400).json({ error: err.message });
      } else if (err) {
          // Another error occurred
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      next(); // Proceed to the next middleware/route handler
  });
});

// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Use the cors middleware to allow cross-origin requests
server.use(cors());

// Configure routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h4>Silence is golden</h4>');
});

server.use('/api', apiRouter);

// Launch server
const PORT = process.env.PORT
server.listen(PORT, function() {
    console.log(`🔹 Server is running on :${PORT}`);
});