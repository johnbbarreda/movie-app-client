import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout logic
    const handleLogout = () => {
      localStorage.removeItem('token'); 
      setUser(null); 
      navigate('/'); 
    };

    handleLogout();
  }, [navigate, setUser]);

  return (
    <div className="container mt-5 text-center">
      <h2>You have been logged out</h2>
      <p>Thank you for using our application. We hope to see you again soon!</p>
      <a href="/" className="btn btn-primary">Return to Home</a>
    </div>
  );
};

export default Logout;
