import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';
import '../styles/navbar.css';
import { useLang } from '../context/LanguageContext'; // ✅ Language context

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const { lang, changeLang, t } = useLang(); // ✅ Destructure language context

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="logo">🎓</div>
        <nav>
          <a href="#about">{t.about}</a>
          <a href="#guidance">{t.guidance}</a>
          <a href="#colleges">{t.colleges}</a>
          <a href="#support">{t.support}</a>
        </nav>
      </div>

      <div className="navbar-right">
        <select
          className="lang-select"
          value={lang}
          onChange={(e) => changeLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="bn">বাংলা</option>
        </select>

        {!isLoggedIn() ? (
          <Link to="/login" className="nav-login">{t.login}</Link>
        ) : (
          <div className="profile-dropdown">
            <span
              onClick={() => setShowDropdown(!showDropdown)}
              className="profile-icon"
            >
              👤
            </span>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/status">Update Status</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
