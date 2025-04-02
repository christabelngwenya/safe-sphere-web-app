const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getMessages, sendMessage } = require('../controllers/messageController');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Routes
router.get('/messages', getMessages);
router.post('/messages', upload.fields([{ name: 'image' }, { name: 'voiceNote' }]), sendMessage);

module.exports = router;