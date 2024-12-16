import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://movieapp-api-lms1.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      console.log('Login Response Data:', data);

      const token = data.access; // Assuming access token is returned here
      if (token) {
        localStorage.setItem('token', token);

        // Check if the user is admin based on credentials
        const isAdmin = (credentials.email === "admin@mail.com" && credentials.password === "admin123");
        
        // Create user object with isAdmin property
        const userData = { ...data.user, isAdmin }; 
        setUser(userData); // Set user context with isAdmin

        // Store user data in localStorage for persistence (optional)
        localStorage.setItem('user', JSON.stringify(userData));

        // Log user details after setting user context
        console.log('Logged in user details:', userData);

        // Redirect based on admin status
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/movies');
        }
      } else {
        console.error('No token received:', data);
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred while trying to log in. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
