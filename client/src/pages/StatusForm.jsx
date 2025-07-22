import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/statusform.css';

const StatusForm = () => {
  const [form, setForm] = useState({
    educationLevel: '',
    stream: '',
    goal: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Submit status data
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/status/submit', form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 2. Get GPS Location
      getLocation(token);
    } catch (err) {
      alert(err.response?.data?.error || 'Status update failed');
    }
  };

  const getLocation = (token) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // 3. Reverse geocode
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse`,
            {
              params: {
                format: 'json',
                lat: latitude,
                lon: longitude,
              },
            }
          );

          const { address } = response.data;
          const state = address.state || '';
          const city = address.city || address.town || address.village || '';

          console.log("Detected:", city, state);

          // 4. Send to backend to fetch colleges
          const res = await axios.get(
            `http://localhost:5000/api/colleges/${state}/${city}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          // Optional: Save to localStorage or navigate to show results
          localStorage.setItem('nearbyColleges', JSON.stringify(res.data));
          navigate('/dashboard');

        } catch (err) {
          console.error("Location fetch error", err);
          alert("Could not detect location or fetch colleges.");
          navigate('/dashboard'); // Fallback to dashboard
        }
      },
      (error) => {
        console.error(error);
        alert("Location access denied or unavailable.");
        navigate('/dashboard');
      }
    );
  };

  return (
    <div className="status-wrapper">
      <form className="status-form" onSubmit={handleSubmit}>
        <h2>Student Status</h2>

        <label>Education Level</label>
        <select name="educationLevel" value={form.educationLevel} onChange={handleChange} required>
          <option value="">Select</option>
          <option>10th</option>
          <option>12th</option>
          <option>Undergraduate</option>
          <option>Postgraduate</option>
        </select>

        <label>Stream</label>
        <select name="stream" value={form.stream} onChange={handleChange} required>
          <option value="">Select</option>
          <option>Science</option>
          <option>Commerce</option>
          <option>Arts</option>
          <option>Other</option>
        </select>

        <label>Career Goal</label>
        <input
          type="text"
          name="goal"
          placeholder="e.g. Software Engineer, IAS Officer"
          value={form.goal}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit & Detect Location</button>
      </form>
    </div>
  );
};

export default StatusForm;
