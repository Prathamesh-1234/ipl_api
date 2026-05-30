# AI Resume Analyzer

A professional AI-powered resume analyzer built with the MERN stack (MongoDB, Express.js, React, Node.js) and Google Gemini AI.

## Features

- **AI-Powered Analysis**: Get comprehensive feedback on your resume using Google's Gemini AI
- **Resume Scoring**: Receive a score out of 100 with detailed breakdown
- **Job Description Matching**: Compare your resume against specific job descriptions
- **ATS Optimization**: Ensure your resume passes Applicant Tracking Systems
- **Skill Identification**: Automatically identify and highlight key skills
- **Actionable Suggestions**: Get specific recommendations to improve your resume
- **Modern UI**: Clean, responsive interface built with React and Vite

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Google Generative AI** - AI analysis with Gemini
- **Multer** - File upload handling
- **PDF-parse** - PDF text extraction

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **CSS3** - Styling with custom design system

## Project Structure

```
resume-analyzer/
├── server/
│   ├── controllers/
│   │   └── resumeController.js
│   ├── models/
│   │   └── Resume.js
│   ├── routes/
│   │   └── resumeRoutes.js
│   ├── services/
│   │   └── geminiService.js
│   ├── middleware/
│   ├── uploads/
│   ├── index.js
│   ├── .env
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ResumeUpload.jsx
│   │   │   ├── ResumeList.jsx
│   │   │   └── ResumeDetail.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Google Gemini API key

### Backend Setup

1. Navigate to the server directory:
```bash
cd resume-analyzer/server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
MONGO_URI="your_mongodb_connection_string"
GEMINI_API_KEY="your_gemini_api_key"
PORT=5000
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd resume-analyzer/client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Resume Analysis
- `POST /api/resume/upload` - Upload and analyze a resume
- `GET /api/resume` - Get all analyzed resumes
- `GET /api/resume/:id` - Get a specific resume analysis
- `DELETE /api/resume/:id` - Delete a resume analysis
- `GET /api/resume/statistics` - Get analysis statistics

## Usage

1. **Upload Resume**: Go to the "Upload Resume" page and select a PDF file
2. **Optional Job Description**: Paste a job description for tailored analysis
3. **Get Analysis**: Click "Analyze Resume" and wait for AI processing
4. **View Results**: See detailed analysis including:
   - Overall score
   - Strengths and weaknesses
   - Identified skills
   - Suggestions for improvement
   - ATS compatibility assessment
   - Job match analysis (if job description provided)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| MONGO_URI | MongoDB connection string | Yes |
| GEMINI_API_KEY | Google Gemini API key | Yes |
| PORT | Server port (default: 5000) | No |

## Features in Detail

### Resume Analysis
- Extracts text from PDF resumes
- Analyzes content structure and formatting
- Identifies key sections (experience, education, skills)
- Provides overall quality score

### Job Description Matching
- Compares resume against job requirements
- Identifies matching and missing skills
- Provides keyword optimization suggestions
- Calculates match percentage

### ATS Compatibility
- Checks for ATS-friendly formatting
- Analyzes keyword density
- Recommends improvements for better parsing

## Security Considerations

- File uploads are validated (PDF only, max 5MB)
- API keys should be stored securely in environment variables
- Uploaded files are stored temporarily and can be deleted after analysis

## Future Enhancements

- Support for multiple file formats (DOCX, TXT)
- User authentication and accounts
- Resume templates and builder
- Historical analysis tracking
- Export analysis reports as PDF
- Integration with job boards
- Multi-language support

## License

ISC

## Author

Professional AI Resume Analyzer

## Support

For issues and questions, please create an issue in the repository.
