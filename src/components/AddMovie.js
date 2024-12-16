import React, { useState } from 'react';

const AddMovie = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://movieapp-api-lms1.onrender.com/movies/addMovie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, director, year, description, genre }),
      });

      if (response.ok) {
        onAdd(); // Call the function to refresh movie list
        // Reset form fields
        setTitle('');
        setDirector('');
        setYear('');
        setDescription('');
        setGenre('');
      } else {
        console.error('Failed to add movie:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter movie title"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="director">Director</label>
        <input
          type="text"
          id="director"
          name="director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          required
          placeholder="Enter director's name"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="year">Year</label>
        <input
          type="number"
          id="year"
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          placeholder="Enter release year"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Enter movie description"
          className="form-control"
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
          placeholder="Enter genre"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Movie</button>
    </form>
  );
};

export default AddMovie;
