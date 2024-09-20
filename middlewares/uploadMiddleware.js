const multer = require('multer');
const cloudinaryConfig = require('../config/cloudinaryConfig');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads/')); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   }
// });

const upload = multer({ storage });

module.exports = upload;
