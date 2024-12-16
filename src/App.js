import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Movies from './pages/Movies'; 
import AdminDashboard from './pages/AdminDashboard';
import Logout from './pages/Logout'; 
import UserContext, { UserProvider } from './context/UserContext';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data
    }
  }, []);

  return (
    <UserProvider value={{ user, setUser }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies" element={<Movies />} /> 
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/logout" element={<Logout setUser={setUser} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
