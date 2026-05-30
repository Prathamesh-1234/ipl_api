import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import resumeService from '../services/api';

const ResumeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      const response = await resumeService.getResumeById(id);
      setResume(response.data);
    } catch (err) {
      console.error('Error fetching resume:', err);
      setError('Failed to load resume details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this resume analysis?')) {
      try {
        await resumeService.deleteResume(id);
        navigate('/resumes');
      } catch (err) {
        console.error('Error deleting resume:', err);
        alert('Failed to delete resume');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading analysis...</p>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="error-page">
        <h2>Error</h2>
        <p>{error || 'Resume not found'}</p>
        <Link to="/resumes" className="btn btn-primary">
          Back to Resumes
        </Link>
      </div>
    );
  }

  const analysis = resume.analysisResult || {};

  return (
    <div className="resume-detail-page">
      <div className="detail-header">
        <button onClick={() => navigate(-1)} className="btn btn-back">
          ← Back
        </button>
        <div className="detail-actions">
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Analysis
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="resume-info-section">
          <h1>{resume.originalName}</h1>
          <p className="upload-date">
            Analyzed on {new Date(resume.createdAt).toLocaleDateString()} at{' '}
            {new Date(resume.createdAt).toLocaleTimeString()}
          </p>
          
          <div className={`score-display ${analysis.score >= 80 ? 'high' : analysis.score >= 60 ? 'medium' : 'low'}`}>
            <div className="score-circle">
              <span className="score-value">{analysis.score || analysis.matchScore}</span>
              <span className="score-label">/ 100</span>
            </div>
            <p className="score-text">
              {analysis.score >= 80 ? 'Excellent' : analysis.score >= 60 ? 'Good' : 'Needs Improvement'}
            </p>
          </div>
        </div>

        {analysis.summary && (
          <div className="analysis-section">
            <h2>Summary</h2>
            <p className="summary-text">{analysis.summary}</p>
          </div>
        )}

        {analysis.strengths && analysis.strengths.length > 0 && (
          <div className="analysis-section">
            <h2>✅ Strengths</h2>
            <ul className="strengths-list">
              {analysis.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>
        )}

        {analysis.weaknesses && analysis.weaknesses.length > 0 && (
          <div className="analysis-section">
            <h2>⚠️ Areas for Improvement</h2>
            <ul className="weaknesses-list">
              {analysis.weaknesses.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              ))}
            </ul>
          </div>
        )}

        {analysis.skills && analysis.skills.length > 0 && (
          <div className="analysis-section">
            <h2>📈 Identified Skills</h2>
            <div className="skills-grid">
              {analysis.skills.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {analysis.experience && (
          <div className="analysis-section">
            <h2>💼 Experience</h2>
            <p>{analysis.experience}</p>
          </div>
        )}

        {analysis.education && (
          <div className="analysis-section">
            <h2>🎓 Education</h2>
            <p>{analysis.education}</p>
          </div>
        )}

        {analysis.suggestions && analysis.suggestions.length > 0 && (
          <div className="analysis-section suggestions-section">
            <h2>💡 Suggestions for Improvement</h2>
            <ol className="suggestions-list">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ol>
          </div>
        )}

        {analysis.atsCompatibility && (
          <div className="analysis-section">
            <h2>✅ ATS Compatibility</h2>
            <p>{analysis.atsCompatibility}</p>
          </div>
        )}

        {analysis.recommendations && analysis.recommendations.length > 0 && (
          <div className="analysis-section">
            <h2>📋 General Recommendations</h2>
            <ul className="recommendations-list">
              {analysis.recommendations.map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Job Description Match Section */}
        {analysis.matchScore !== undefined && (
          <div className="analysis-section match-section">
            <h2>🎯 Job Match Analysis</h2>
            <div className="match-score">
              <span className="match-value">{analysis.matchScore}%</span>
              <span className="match-label">Match with Job Description</span>
            </div>
            
            {analysis.matchingSkills && analysis.matchingSkills.length > 0 && (
              <div className="match-details">
                <h3>Matching Skills</h3>
                <div className="skills-grid">
                  {analysis.matchingSkills.map((skill, index) => (
                    <span key={index} className="skill-badge match">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {analysis.missingSkills && analysis.missingSkills.length > 0 && (
              <div className="match-details">
                <h3>Missing Skills</h3>
                <div className="skills-grid">
                  {analysis.missingSkills.map((skill, index) => (
                    <span key={index} className="skill-badge missing">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {analysis.keywordMatch && (
              <div className="match-details">
                <h3>Keyword Optimization</h3>
                <p>{analysis.keywordMatch}</p>
              </div>
            )}

            {analysis.gapAnalysis && (
              <div className="match-details">
                <h3>Gap Analysis</h3>
                <p>{analysis.gapAnalysis}</p>
              </div>
            )}

            {analysis.tailoringSuggestions && analysis.tailoringSuggestions.length > 0 && (
              <div className="match-details">
                <h3>Tailoring Suggestions</h3>
                <ol>
                  {analysis.tailoringSuggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeDetail;
