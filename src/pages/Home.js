import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleSeeMovies = () => {
    navigate('/movies'); // Redirect to the Movies page
  };

  return (
    <div className="container mt-5 text-center">
      <h1>Welcome to the Movie Catalog</h1>
      <p>Discover and manage your favorite movies!</p>
      <button className="btn btn-primary" onClick={handleSeeMovies}>
        See Movies!
      </button>
    </div>
  );
};

export default Home;
