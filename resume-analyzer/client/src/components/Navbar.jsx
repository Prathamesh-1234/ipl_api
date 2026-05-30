import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <h1>📄 AI Resume Analyzer</h1>
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/upload">Upload Resume</Link></li>
        <li><Link to="/resumes">View Resumes</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
