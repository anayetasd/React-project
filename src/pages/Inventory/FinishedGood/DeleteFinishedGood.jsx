import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const FinishedGoodDeleteConfirm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [finishedGood, setFinishedGood] = useState(null);

  const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/`;
  const endpoint = `finishedgoods/${id}`;

  useEffect(() => {
    const fetchFinishedGood = async () => {
      try {
        const res = await fetch(`${baseUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        const data = await res.json();
        setFinishedGood(data.finishedgood ?? data);
      } catch (err) {
        console.error('Fetch Error:', err);
      }
    };
    fetchFinishedGood();
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure?")) {
      try {
        const res = await fetch(`${baseUrl}${endpoint}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        const data = await res.json();
        console.log(data);
        navigate('/finishedgoods');
      } catch (err) {
        console.error('Delete Error:', err);
      }
    }
  };

  if (!finishedGood) return <div>Loading...</div>;

  return (
    <div style={styles.confirmContainer}>
      <h2 style={styles.heading}>Delete Product: {finishedGood.product_name}</h2>
      <p style={styles.paragraph}>Are you sure you want to delete this finished good?</p>
      <form onSubmit={handleDelete}>
        <button type="submit" style={styles.deleteButton}>Yes, Confirm Delete</button>
      </form>
      <Link to="/finishedgoods" style={styles.cancelButton}>← Cancel</Link>
    </div>
  );
};

export default FinishedGoodDeleteConfirm;

// Inline styles
const styles = {
  confirmContainer: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#fff3f3',
    border: '1px solid #f5c6cb',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  heading: {
    color: '#dc3545',
    marginBottom: '20px'
  },
  paragraph: {
    fontSize: '18px',
    marginBottom: '30px'
  },
  deleteButton: {
    padding: '10px 20px',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#dc3545',
    color: 'white',
    cursor: 'pointer'
  },
  cancelButton: {
    marginTop: '20px',
    display: 'inline-block',
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '8px 14px',
    borderRadius: '6px',
    textDecoration: 'none'
  }
};
