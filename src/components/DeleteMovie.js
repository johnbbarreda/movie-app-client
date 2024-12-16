import React from 'react';

const DeleteMovie = ({ movieId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://movieapp-api-lms1.onrender.com/movies/deleteMovie/${movieId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        onDelete(); 
      } else {
        console.error('Failed to delete movie:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
  );
};

export default DeleteMovie;
