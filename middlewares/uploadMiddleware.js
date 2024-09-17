const multer = require('multer');
const path = require('path');

// Configure storage and file destination
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/resumes')); // Ensure correct path
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  }
});

// File filter to allow only PDFs
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only PDF files are allowed'), false);
  }
  cb(null, true);
};

// Define upload limits and file filter
const upload = multer({ 
  storage, 
  fileFilter, 
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});

module.exports = upload;
