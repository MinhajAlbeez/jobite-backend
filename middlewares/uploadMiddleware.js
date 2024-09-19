const multer = require('multer');
const path = require('path');

// Define the storage destination and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/')); // Ensure this points to the correct directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Create a unique filename
  }
});

const upload = multer({ storage });

module.exports = upload;
