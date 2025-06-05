import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SubmitFeedback from './pages/SubmitFeedback';
import MyFeedback from './pages/MyFeedback';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit" element={<SubmitFeedback />} />
        <Route path="/my-feedback" element={<MyFeedback />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* TODO: Add route protection and navigation */}
      </Routes>
    </Router>
  );
}

export default App;
