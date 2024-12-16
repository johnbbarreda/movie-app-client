import React, { useState } from 'react';

const EditMovie = ({ movie, onUpdate }) => {
  const [title, setTitle] = useState(movie.title);
  const [director, setDirector] = useState(movie.director);
  const [year, setYear] = useState(movie.year);
  const [description, setDescription] = useState(movie.description);
  const [genre, setGenre] = useState(movie.genre);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://movieapp-api-lms1.onrender.com/movies/updateMovie/${movie._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title,
          director,
          year,
          description,
          genre,
        }),
      });

      if (response.ok) {
        onUpdate(); // Call the update function passed from AdminDashboard
      } else {
        console.error('Failed to update movie:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className="mb-3">
        <label htmlFor="edit-title">Title</label>
        <input
          type="text"
          id="edit-title" // Unique ID for the input field
          name="edit-title" // Name attribute for form handling
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter movie title"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="edit-director">Director</label>
        <input
          type="text"
          id="edit-director"
          name="edit-director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          required
          placeholder="Enter director's name"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="edit-year">Year</label>
        <input
          type="number"
          id="edit-year"
          name="edit-year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          placeholder="Enter release year"
          className="form-control"
        />
      </div>
      <div className='mb-3'>
         <label htmlFor='edit-description'>Description</label>
         <textarea 
           id='edit-description'
           name='edit-description'
           value={description} 
           onChange={(e) => setDescription(e.target.value)} 
           required 
           placeholder='Enter movie description' 
           className='form-control'
         ></textarea>
       </div>
       <div className='mb-3'>
         <label htmlFor='edit-genre'>Genre</label>
         <input 
           type='text' 
           id='edit-genre' 
           name='edit-genre' 
           value={genre} 
           onChange={(e) => setGenre(e.target.value)} 
           required 
           placeholder='Enter genre' 
           className='form-control' 
         />
       </div>

       {/* Update Button */}
       <button type='submit' className='btn btn-primary'>Update Movie</button>

     </form>
   );
};

export default EditMovie;
