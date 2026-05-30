import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import resumeService from '../services/api';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a resume file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await resumeService.uploadResume(file, jobDescription);
      console.log('Analysis result:', response);
      navigate(`/resume/${response.data._id}`);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.details || err.response?.data?.error || 'Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h1>Upload Your Resume</h1>
        <p className="upload-description">
          Upload your resume in PDF format and get instant AI-powered analysis.
          Optionally, add a job description for tailored feedback.
        </p>

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="resume" className="form-label">
              Resume (PDF)*
            </label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="resume"
                accept=".pdf"
                onChange={handleFileChange}
                className="file-input"
              />
              {file && (
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="jobDescription" className="form-label">
              Job Description (Optional)
            </label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here to get tailored analysis and match score..."
              rows="8"
              className="form-textarea"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="btn btn-primary btn-large"
            disabled={loading || !file}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Analyzing Resume...
              </>
            ) : (
              'Analyze Resume'
            )}
          </button>
        </form>

        <div className="upload-tips">
          <h3>Tips for Best Results:</h3>
          <ul>
            <li>Ensure your resume is in PDF format</li>
            <li>Maximum file size: 5MB</li>
            <li>Add a job description for more targeted feedback</li>
            <li>Make sure your resume text is selectable (not scanned images)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
