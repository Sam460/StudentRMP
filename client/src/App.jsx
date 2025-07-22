import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import StatusForm from './pages/StatusForm';
import Roadmap from './pages/Roadmap';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar'; // ✅ Import Navbar

// ✅ Wrapper for protecting routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

// ✅ Layout that includes the Navbar
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        {/* ✅ Protected Routes */}
        <Route
          path="status"
          element={<PrivateRoute><StatusForm /></PrivateRoute>}
        />
        <Route
          path="roadmap"
          element={<PrivateRoute><Roadmap /></PrivateRoute>}
        />
        <Route
          path="dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />
      </Route>
    </Routes>
  );
}

export default App;
