const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const resumeController = require('../controllers/resumeController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'resume-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to allow only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Routes
router.post('/upload', upload.single('resume'), (req, res) => {
  resumeController.uploadAndAnalyze(req, res);
});

router.get('/', (req, res) => {
  resumeController.getAllResumes(req, res);
});

router.get('/statistics', (req, res) => {
  resumeController.getStatistics(req, res);
});

router.get('/:id', (req, res) => {
  resumeController.getResumeById(req, res);
});

router.delete('/:id', (req, res) => {
  resumeController.deleteResume(req, res);
});

module.exports = router;
