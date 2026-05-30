import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ResumeUpload from './pages/ResumeUpload';
import ResumeList from './pages/ResumeList';
import ResumeDetail from './pages/ResumeDetail';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<ResumeUpload />} />
            <Route path="/resumes" element={<ResumeList />} />
            <Route path="/resume/:id" element={<ResumeDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
