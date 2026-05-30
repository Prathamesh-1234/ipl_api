import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Professional AI Resume Analyzer</h1>
        <p className="hero-subtitle">
          Get instant, AI-powered feedback on your resume using Google Gemini AI.
          Optimize your resume for ATS systems and improve your job application success rate.
        </p>
        <div className="hero-buttons">
          <Link to="/upload" className="btn btn-primary">
            Upload Your Resume
          </Link>
          <Link to="/resumes" className="btn btn-secondary">
            View Previous Analyses
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>AI-Powered Analysis</h3>
            <p>Get comprehensive feedback powered by Google's advanced Gemini AI technology.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Scoring System</h3>
            <p>Receive a detailed score out of 100 with breakdown of strengths and weaknesses.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>Job Matching</h3>
            <p>Compare your resume against specific job descriptions for tailored feedback.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>ATS Optimization</h3>
            <p>Ensure your resume passes Applicant Tracking Systems used by employers.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Actionable Suggestions</h3>
            <p>Get specific, actionable recommendations to improve your resume.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Skill Identification</h3>
            <p>Automatically identify and highlight your key skills and competencies.</p>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Upload Resume</h3>
            <p>Upload your resume in PDF format</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Optional: Add Job Description</h3>
            <p>Paste a job description for tailored analysis</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get AI Analysis</h3>
            <p>Receive instant, detailed feedback from our AI</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Improve & Apply</h3>
            <p>Use insights to optimize your resume and apply with confidence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
