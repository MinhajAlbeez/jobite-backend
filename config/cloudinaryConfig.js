const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resume',  // Specify the folder in your Cloudinary account where the files will be stored
    allowed_formats: ['jpg', 'png', 'pdf'],  // Specify allowed file formats
    transformation: [{ width: 500, height: 500, crop: 'limit' }],  // Optional transformation
  },
});

const upload = multer({ storage });

module.exports = upload;
