const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const statusRoutes = require('./routes/statusRoutes');
app.use('/api/status', statusRoutes);

const roadmapRoutes = require('./routes/roadmapRoutes');
app.use('/api/roadmap', roadmapRoutes);

// ✅ New: College Routes
const collegeRoutes = require('./routes/colleges');
app.use('/api/colleges', collegeRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB Connected");
}).catch(err => console.error(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
