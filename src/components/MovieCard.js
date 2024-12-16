import React, { useState } from 'react';
import AddComment from './AddComment';

const MovieCard = ({ movie }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);

  const toggleCommentForm = () => {
    setShowCommentForm(prev => !prev);
  };

  const handleCommentAdded = () => {
    console.log('Comment added successfully!');
    toggleCommentForm(); // Hide the form after adding a comment
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
          <p className="card-text"><strong>Director:</strong> {movie.director}</p>
          <p className="card-text"><strong>Year:</strong> {movie.year}</p>
          <p className="card-text"><strong>Genre:</strong> {movie.genre}</p>
          <p className="card-text"><strong>Description:</strong> {movie.description}</p>

          {/* Optional: Display comments if needed */}
          {movie.comments && movie.comments.length > 0 && (
            <div>
              <h6>Comments:</h6>
              <ul>
                {movie.comments.map((comment, index) => (
                  <li key={index}>{comment.comment}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Add Comment Button */}
          <button id="addComment" className="btn btn-secondary" onClick={toggleCommentForm}>
            {showCommentForm ? 'Cancel' : 'Add Comment'}
          </button>

          {/* Show Add Comment Form */}
          {showCommentForm && (
            <AddComment movieId={movie._id} onCommentAdded={handleCommentAdded} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
