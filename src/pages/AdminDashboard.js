import React, { useEffect, useState } from 'react';
import AddMovie from '../components/AddMovie';
import EditMovie from '../components/EditMovie';
import DeleteMovie from '../components/DeleteMovie';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://movieapp-api-lms1.onrender.com/movies/getMovies');
      if (response.ok) {
        const data = await response.json();
        setMovies(data.movies || data); // Adjust based on your API response structure
      } else {
        throw new Error('Failed to fetch movies');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAddModal = () => {
    setShowAddModal(prev => !prev);
  };

  const handleEditClick = (movie) => {
    setEditingMovie(movie);
    setShowEditModal(true); // Show edit modal
  };

  const handleUpdateSuccess = () => {
    fetchMovies(); // Refresh movie list after an update
    setEditingMovie(null); // Clear editing state
    setShowEditModal(false); // Close edit modal
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <Button className="btn btn-primary mb-3" onClick={handleToggleAddModal}>
        Add Movie
      </Button>

      {/* Add Movie Modal */}
      <Modal show={showAddModal} onHide={handleToggleAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMovie onAdd={() => { fetchMovies(); handleToggleAddModal(); }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleToggleAddModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Movie Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingMovie && (
            <>
              <h5>Current Details:</h5>
              <p><strong>Title:</strong> {editingMovie.title}</p>
              <p><strong>Director:</strong> {editingMovie.director}</p>
              <p><strong>Year:</strong> {editingMovie.year}</p>
              <p><strong>Description:</strong> {editingMovie.description}</p>
              <p><strong>Genre:</strong> {editingMovie.genre}</p>

              {/* Edit form */}
              <EditMovie movie={editingMovie} onUpdate={handleUpdateSuccess} />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Display movies in a table */}
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.year}</td>
              <td>
                {/* Edit button */}
                <Button className="btn btn-warning me-2" onClick={() => handleEditClick(movie)}>
                  Edit
                </Button>
                {/* Delete button */}
                <DeleteMovie movieId={movie._id} onDelete={fetchMovies} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
