import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [status, setStatus] = useState(null);
  const [roadmap, setRoadmap] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [showAllColleges, setShowAllColleges] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:5000/api/status/latest', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setStatus(res.data.status);

        const stored = localStorage.getItem('nearbyColleges');
        if (stored) {
          setColleges(JSON.parse(stored));
        } else {
          return axios.get(`http://localhost:5000/api/colleges/${res.data.status.preferredLocation}`);
        }
      })
      .then(res => {
        if (res?.data) {
          setColleges(res.data);
        }
      })
      .catch(err => console.error('Status/College Error:', err));

    axios.get('http://localhost:5000/api/roadmap/my-roadmap', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setRoadmap(res.data.roadmap))
      .catch(err => console.error('Roadmap Error:', err));
  }, []);

  return (
    <div className="dashboard">
      <h2>🎓 Welcome to Your Dashboard</h2>

      {status && (
        <div className="card">
          <h3>📋 Your Education Info</h3>
          <p><strong>Level:</strong> {status.educationLevel}</p>
          <p><strong>Stream:</strong> {status.stream}</p>
          <p><strong>Goal:</strong> {status.goal}</p>
          <p><strong>Location:</strong> {status.preferredLocation}</p>
        </div>
      )}

      {roadmap.length > 0 && (
        <div className="card">
          <h3>🗺️ Your Roadmap Preview</h3>
          <ul>
            {roadmap.slice(0, 3).map((step, idx) => (
              <li key={idx}>➤ {step}</li>
            ))}
          </ul>
          <Link to="/roadmap" className="dashboard-btn">View Full Roadmap</Link>
        </div>
      )}

      {colleges.length > 0 && (
        <div className="card">
          <h3>🏫 Colleges Near You</h3>
          <ul>
            {(showAllColleges ? colleges : colleges.slice(0, 3)).map((college, idx) => (
              <li key={idx}>
                🎓 {college.name} ({college.type}) - {college.city}, {college.state}
              </li>
            ))}
          </ul>
          {colleges.length > 3 && (
            <button
              className="see-more-btn"
              onClick={() => setShowAllColleges(!showAllColleges)}
            >
              {showAllColleges ? "Show Less" : "See More Colleges"}
            </button>
          )}
        </div>
      )}

      <div className="dashboard-actions">
        <Link to="/status" className="dashboard-btn outline">Update Info</Link>
      </div>
    </div>
  );
};

export default Dashboard;
