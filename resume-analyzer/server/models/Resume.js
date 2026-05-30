const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  analysisResult: {
    type: Object,
    default: null
  },
  score: {
    type: Number,
    default: 0
  },
  feedback: {
    type: String,
    default: ''
  },
  skills: {
    type: [String],
    default: []
  },
  suggestions: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resume', resumeSchema);
