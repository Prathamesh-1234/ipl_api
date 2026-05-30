# Quick Start Guide

## Running the Application

### Option 1: Run Both Servers Simultaneously

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
cd /workspace/resume-analyzer/server
npm start
```
The backend will run on http://localhost:5000

**Terminal 2 - Frontend Server:**
```bash
cd /workspace/resume-analyzer/client
npm run dev
```
The frontend will run on http://localhost:3000

### Option 2: Using npm scripts (if configured)

You can also create a root package.json with concurrent scripts to run both servers.

## Testing the Application

1. Open your browser and navigate to http://localhost:3000
2. Click on "Upload Resume"
3. Select a PDF resume file
4. (Optional) Add a job description for tailored analysis
5. Click "Analyze Resume"
6. Wait for the AI analysis to complete
7. View detailed results including:
   - Overall score
   - Strengths and weaknesses
   - Identified skills
   - Suggestions for improvement
   - ATS compatibility assessment

## API Testing

You can test the API directly using curl or Postman:

### Upload Resume
```bash
curl -X POST http://localhost:5000/api/resume/upload \
  -F "resume=@/path/to/your/resume.pdf" \
  -F "jobDescription=Optional job description text"
```

### Get All Resumes
```bash
curl http://localhost:5000/api/resume
```

### Get Statistics
```bash
curl http://localhost:5000/api/resume/statistics
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure your MongoDB Atlas connection string is correct
- Check that your IP address is whitelisted in MongoDB Atlas
- Verify the database user has proper permissions

### Gemini API Issues
- Ensure your API key is valid and has not expired
- Check that you have sufficient API quota
- Verify the API key is correctly set in the .env file

### File Upload Issues
- Ensure the file is a valid PDF
- Check file size is under 5MB
- Make sure the uploads directory exists and is writable

## Production Deployment

For production deployment:

1. Build the frontend:
```bash
cd client
npm run build
```

2. Serve the built files from the Express server or use a static file server like Nginx

3. Set environment variables securely (not in .env file)

4. Use a process manager like PM2 for the Node.js server:
```bash
npm install -g pm2
pm2 start server/index.js --name resume-analyzer
```

5. Set up SSL/HTTPS for secure connections

6. Configure CORS properly for your production domain
