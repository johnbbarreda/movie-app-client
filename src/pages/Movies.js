import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://movieapp-api-lms1.onrender.com/movies/getMovies');
        
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched data:', data); // Log for debugging

          // Check if data is an array or contains a movies property
          if (Array.isArray(data)) {
            setMovies(data);
          } else if (data.movies) { // Adjust this based on actual structure
            setMovies(data.movies);
          } else {
            throw new Error('Expected an array of movies');
          }
        } else {
          throw new Error('Failed to fetch movies');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError(error.message);
      }
    };

    fetchMovies();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Movie Catalog</h2>
      <div className="row">
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
