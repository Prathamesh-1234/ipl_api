const Resume = require('../models/Resume');
const geminiService = require('../services/geminiService');
const fs = require('fs');

class ResumeController {
  // Upload and analyze resume
  async uploadAndAnalyze(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { jobDescription } = req.body;
      const filePath = req.file.path;
      const fileName = req.file.filename;
      const originalName = req.file.originalname;

      // Extract text from PDF
      const resumeText = await geminiService.extractTextFromPDF(filePath);

      if (!resumeText || resumeText.trim().length === 0) {
        fs.unlinkSync(filePath);
        return res.status(400).json({ error: 'Could not extract text from PDF' });
      }

      // Analyze resume with Gemini AI
      let analysisResult;
      if (jobDescription && jobDescription.trim()) {
        analysisResult = await geminiService.compareWithJobDescription(resumeText, jobDescription);
      } else {
        analysisResult = await geminiService.analyzeResume(resumeText);
      }

      // Save to database
      const resume = new Resume({
        fileName,
        originalName,
        filePath,
        analysisResult,
        score: analysisResult.score || analysisResult.matchScore || 0,
        feedback: analysisResult.summary || analysisResult.gapAnalysis || '',
        skills: analysisResult.skills || analysisResult.matchingSkills || [],
        suggestions: analysisResult.suggestions || analysisResult.tailoringSuggestions || []
      });

      await resume.save();

      res.status(200).json({
        message: 'Resume analyzed successfully',
        data: resume
      });
    } catch (error) {
      console.error('Error in uploadAndAnalyze:', error);
      
      // Clean up uploaded file on error
      if (req.file && req.file.path) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (unlinkError) {
          console.error('Error deleting file:', unlinkError);
        }
      }
      
      res.status(500).json({ 
        error: 'Failed to analyze resume',
        details: error.message 
      });
    }
  }

  // Get all analyzed resumes
  async getAllResumes(req, res) {
    try {
      const resumes = await Resume.find().sort({ createdAt: -1 });
      res.status(200).json({
        message: 'Resumes retrieved successfully',
        count: resumes.length,
        data: resumes
      });
    } catch (error) {
      console.error('Error in getAllResumes:', error);
      res.status(500).json({ error: 'Failed to retrieve resumes' });
    }
  }

  // Get single resume by ID
  async getResumeById(req, res) {
    try {
      const resume = await Resume.findById(req.params.id);
      
      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      res.status(200).json({
        message: 'Resume retrieved successfully',
        data: resume
      });
    } catch (error) {
      console.error('Error in getResumeById:', error);
      res.status(500).json({ error: 'Failed to retrieve resume' });
    }
  }

  // Delete resume
  async deleteResume(req, res) {
    try {
      const resume = await Resume.findById(req.params.id);
      
      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      // Delete the physical file
      if (fs.existsSync(resume.filePath)) {
        fs.unlinkSync(resume.filePath);
      }

      await Resume.findByIdAndDelete(req.params.id);

      res.status(200).json({
        message: 'Resume deleted successfully'
      });
    } catch (error) {
      console.error('Error in deleteResume:', error);
      res.status(500).json({ error: 'Failed to delete resume' });
    }
  }

  // Get resume statistics
  async getStatistics(req, res) {
    try {
      const totalResumes = await Resume.countDocuments();
      
      const averageScore = await Resume.aggregate([
        {
          $group: {
            _id: null,
            avgScore: { $avg: '$score' }
          }
        }
      ]);

      const scoreDistribution = await Resume.aggregate([
        {
          $bucket: {
            groupBy: '$score',
            boundaries: [0, 20, 40, 60, 80, 100],
            default: 'Other',
            output: {
              count: { $sum: 1 }
            }
          }
        }
      ]);

      res.status(200).json({
        message: 'Statistics retrieved successfully',
        data: {
          totalResumes,
          averageScore: averageScore[0]?.avgScore || 0,
          scoreDistribution
        }
      });
    } catch (error) {
      console.error('Error in getStatistics:', error);
      res.status(500).json({ error: 'Failed to retrieve statistics' });
    }
  }
}

module.exports = new ResumeController();
