import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/statusform.css';

const StatusForm = () => {
  const [form, setForm] = useState({
    name: '',
    gender: '',
    studyStatus: '',
    interestedField: '',
    address: '',
    district: '',
    pin: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      // 1. Submit form data
      await axios.post('http://localhost:5000/api/status/submit', form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 2. GPS detection
      getLocation(token);
    } catch (err) {
      console.error(err);
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
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
            params: {
              format: 'json',
              lat: latitude,
              lon: longitude,
            },
          });

          const { address } = response.data;
          const state = address.state || '';
          const city = address.city || address.town || address.village || '';

          console.log("Detected:", city, state);

          const res = await axios.get(`http://localhost:5000/api/colleges/${state}/${city}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          localStorage.setItem('nearbyColleges', JSON.stringify(res.data));
          navigate('/dashboard');
        } catch (err) {
          console.error("Location fetch error", err);
          alert("Could not detect location or fetch colleges.");
          navigate('/dashboard');
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
        <h2>📝 Update Your Educational Status</h2>

        <label>Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />

        <label>Gender</label>
        <div className="gender-group">
          <label><input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male</label>
          <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
          <label><input type="radio" name="gender" value="Other" onChange={handleChange} /> Other</label>
        </div>

        <label>Current Study Status</label>
        <select name="studyStatus" value={form.studyStatus} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="10th">10th</option>
          <option value="12th">12th</option>
          <option value="Diploma">Diploma</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Postgraduate">Postgraduate</option>
        </select>

        <label>Interested Field</label>
        <select name="interestedField" value={form.interestedField} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Science">Science</option>
          <option value="Commerce">Commerce</option>
          <option value="Arts">Arts</option>
          <option value="Engineering">Engineering</option>
          <option value="Medical">Medical</option>
          <option value="Law">Law</option>
        </select>

        <label>Current Address</label>
        <input type="text" name="address" value={form.address} onChange={handleChange} required />

        <label>District</label>
        <input type="text" name="district" value={form.district} onChange={handleChange} required />

        <label>Pin Code</label>
        <input type="text" name="pin" value={form.pin} onChange={handleChange} required />

        <button type="submit">Update Data & Detect Location</button>
      </form>
    </div>
  );
};

export default StatusForm;
