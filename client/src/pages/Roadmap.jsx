import React, { useEffect, useState } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import '../styles/roadmap.css';

const Roadmap = () => {
  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/roadmap/my-roadmap', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRoadmap(res.data.roadmap || []);
      } catch (err) {
        console.error('Failed to load roadmap');
      }
    };

    fetchRoadmap();
  }, []);

  const handleDownload = () => {
    const element = document.getElementById('roadmap-print');
    const options = {
      margin: 0.5,
      filename: 'Student_Education_Roadmap.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="roadmap-page">
      <h2>Your Complete Roadmap</h2>

      <div id="roadmap-print" className="roadmap-box">
        {roadmap.length === 0 ? (
          <p>No roadmap found.</p>
        ) : (
          roadmap.map((step, index) => (
            <div key={index} className="roadmap-step">
              <span>{index + 1}.</span> {step}
            </div>
          ))
        )}
      </div>

      <button className="download-btn" onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default Roadmap;
