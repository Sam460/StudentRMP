import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="homepage">
      {/* Hero */}
      <section className="hero">
        <h1>Build Your Future Roadmap</h1>
        <p>Get personalized guidance to reach your educational and career goals.</p>
        <div className="hero-buttons">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/register" className="btn register-btn">Register</Link>
        </div>
      </section>

      {/* About */}
      <section className="about" id="about">
        <h2>About Us</h2>
        <p>
          We provide students with step-by-step educational roadmaps to help them
          achieve their career objectives. Discover the best colleges and schools
          tailored to your needs.
        </p>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="guidance">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="icon">📋</div>
            <div className="label">Fill Out Status</div>
          </div>
          <div className="arrow">➔</div>
          <div className="step">
            <div className="icon">🚩</div>
            <div className="label">Generate Roadmap</div>
          </div>
          <div className="arrow">➔</div>
          <div className="step">
            <div className="icon">📍</div>
            <div className="label">Explore Colleges</div>
          </div>
          <div className="arrow">➔</div>
          <div className="step">
            <div className="icon">📄</div>
            <div className="label">Download Plan</div>
          </div>
        </div>
      </section>

      {/* Top Colleges */}
      <section className="colleges" id="colleges">
        <h2>Top Colleges</h2>
        <div className="college-grid">
          <div className="college-card">
            <div className="college-icon">🏫</div>
            <div className="college-label">School Name</div>
          </div>
          <div className="college-card">
            <div className="college-icon">🎓</div>
            <div className="college-label">College Name</div>
          </div>
          <div className="college-card">
            <div className="college-icon">🏛️</div>
            <div className="college-label">University Name</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="support">
        <div className="footer-col">
          <h4>Contact</h4>
          <p>info@example.com</p>
          <p>+123-456-7890</p>
        </div>
        <div className="footer-col">
          <h4>About</h4>
          <p>About</p>
          <p>Guidance</p>
        </div>
        <div className="footer-col">
          <h4>Guidance</h4>
          <p>Colleges</p>
          <p>Support</p>
        </div>
        <div className="footer-col">
          <select className="lang-select">
            <option>English</option>
          </select>
        </div>
      </footer>
    </div>
  );
};

export default Home;
