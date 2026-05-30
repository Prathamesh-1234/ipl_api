import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import resumeService from '../services/api';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await resumeService.getAllResumes();
      setResumes(response.data);
    } catch (err) {
      console.error('Error fetching resumes:', err);
      setError('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume analysis?')) {
      try {
        await resumeService.deleteResume(id);
        fetchResumes();
      } catch (err) {
        console.error('Error deleting resume:', err);
        alert('Failed to delete resume');
      }
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 60) return 'score-medium';
    return 'score-low';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading resumes...</p>
      </div>
    );
  }

  return (
    <div className="resume-list-page">
      <div className="resume-list-header">
        <h1>Analyzed Resumes</h1>
        <Link to="/upload" className="btn btn-primary">
          Upload New Resume
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {resumes.length === 0 ? (
        <div className="empty-state">
          <p>No resumes analyzed yet.</p>
          <Link to="/upload" className="btn btn-primary">
            Upload Your First Resume
          </Link>
        </div>
      ) : (
        <div className="resume-grid">
          {resumes.map((resume) => (
            <div key={resume._id} className="resume-card">
              <div className="resume-card-header">
                <div className="resume-icon">📄</div>
                <div className="resume-info">
                  <h3>{resume.originalName}</h3>
                  <p className="resume-date">
                    {new Date(resume.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className={`score-badge ${getScoreColor(resume.score)}`}>
                Score: {resume.score}/100
              </div>

              {resume.skills && resume.skills.length > 0 && (
                <div className="skills-preview">
                  <span className="skills-label">Key Skills:</span>
                  <div className="skills-tags">
                    {resume.skills.slice(0, 5).map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                    {resume.skills.length > 5 && (
                      <span className="skill-tag more">+{resume.skills.length - 5}</span>
                    )}
                  </div>
                </div>
              )}

              <p className="feedback-preview">
                {resume.feedback?.substring(0, 100)}...
              </p>

              <div className="resume-card-actions">
                <Link 
                  to={`/resume/${resume._id}`} 
                  className="btn btn-secondary btn-small"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleDelete(resume._id)}
                  className="btn btn-danger btn-small"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeList;
