import React, { useState } from 'react';

const AddComment = ({ movieId, onCommentAdded }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://movieapp-api-lms1.onrender.com/movies/addComment/${movieId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is included
        },
        body: JSON.stringify({ comment }),
      });

      if (response.ok) {
        onCommentAdded(); // Call function to refresh comments or movie details
        setComment(''); // Clear the comment input
      } else {
        const errorText = await response.text(); // Get raw text for debugging
        console.error('Failed to add comment:', response.statusText, errorText);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder="Add your comment here"
          className="form-control"
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Add Comment</button>
    </form>
  );
};

export default AddComment;
