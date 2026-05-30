import axios from 'axios';

const API_BASE_URL = '/api/resume';

class ResumeService {
  // Upload and analyze resume
  async uploadResume(file, jobDescription = '') {
    const formData = new FormData();
    formData.append('resume', file);
    if (jobDescription) {
      formData.append('jobDescription', jobDescription);
    }

    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }

  // Get all resumes
  async getAllResumes() {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  }

  // Get single resume
  async getResumeById(id) {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  }

  // Delete resume
  async deleteResume(id) {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  }

  // Get statistics
  async getStatistics() {
    const response = await axios.get(`${API_BASE_URL}/statistics`);
    return response.data;
  }
}

export default new ResumeService();
