const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdfParse = require('pdf-parse');
const fs = require('fs');

class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async extractTextFromPDF(filePath) {
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF');
    }
  }

  async analyzeResume(resumeText, jobDescription = '') {
    try {
      const prompt = `
        You are a professional AI resume analyzer. Analyze the following resume and provide a comprehensive assessment.
        
        ${jobDescription ? `Job Description: ${jobDescription}\n\n` : ''}
        
        Resume Text:
        ${resumeText}
        
        Please provide your analysis in the following JSON format:
        {
          "score": <number between 0-100>,
          "summary": "<brief summary of the candidate's profile>",
          "strengths": ["<list of strengths>"],
          "weaknesses": ["<list of areas for improvement>"],
          "skills": ["<list of identified skills>"],
          "experience": "<years of experience and key roles>",
          "education": "<educational background>",
          "suggestions": ["<specific actionable suggestions to improve the resume>"],
          "atsCompatibility": "<assessment of ATS compatibility>",
          "recommendations": ["<general recommendations for job applications>"]
        }
        
        Be thorough, professional, and constructive in your analysis. Focus on both content and formatting.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      // Extract JSON from the response (in case there's markdown formatting)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        text = jsonMatch[0];
      }
      
      const analysis = JSON.parse(text);
      return analysis;
    } catch (error) {
      console.error('Error analyzing resume with Gemini:', error);
      throw new Error('Failed to analyze resume with AI');
    }
  }

  async compareWithJobDescription(resumeText, jobDescription) {
    try {
      const prompt = `
        Compare the following resume with the job description and provide a detailed match analysis.
        
        Job Description:
        ${jobDescription}
        
        Resume Text:
        ${resumeText}
        
        Please provide your analysis in the following JSON format:
        {
          "matchScore": <number between 0-100>,
          "matchingSkills": ["<skills that match the job requirements>"],
          "missingSkills": ["<skills mentioned in job description but missing in resume>"],
          "keywordMatch": "<assessment of keyword optimization>",
          "gapAnalysis": "<analysis of gaps between resume and job requirements>",
          "tailoringSuggestions": ["<specific suggestions to tailor resume for this job>"]
        }
        
        Be specific and actionable in your recommendations.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        text = jsonMatch[0];
      }
      
      const comparison = JSON.parse(text);
      return comparison;
    } catch (error) {
      console.error('Error comparing resume with job description:', error);
      throw new Error('Failed to compare resume with job description');
    }
  }
}

module.exports = new GeminiService();
