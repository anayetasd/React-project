import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ConfirmDeletePurchase = () => {
  const { id: purchaseId } = useParams();
  const navigate = useNavigate();

  const [purchase, setPurchase] = useState({});
  const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/';
  const endpoint = `purchases/${purchaseId}`;

  // Fetch purchase data on component mount
  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          headers: { Accept: 'application/json' },
        });
        const data = await response.json();
        setPurchase(data.purchase ?? data);
        console.log('Fetched Purchase:', data);
      } catch (err) {
        console.error('Fetch Error:', err);
      }
    };

    fetchPurchase();
  }, [baseUrl, endpoint]);

  // Handle delete button click
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this purchase?')) {
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: 'DELETE',
          headers: { Accept: 'application/json' },
        });
        console.log('Delete response:', response.status);

        if (!response.ok) {
          alert('❌ Delete failed! Please check the backend or network.');
          return;
        }

        alert('✅ Purchase deleted successfully!');
        navigate('/purchases');
      } catch (err) {
        console.error('Fetch Error:', err);
        alert('⚠️ Error while deleting. See console.');
      }
    }
  };

  return (
    <div style={styles.confirmContainer}>
      <h2 style={styles.heading}>Confirm Delete Purchase ID #{purchaseId}</h2>
      <p style={styles.paragraph}>Are you sure you want to delete this purchase?</p>

      <input
        type="button"
        className="btn-danger"
        onClick={handleDelete}
        value="Yes, Confirm Delete"
        style={styles.btnDanger}
      />
      <br />
      <Link to="/purchases" className="btn-back" style={styles.btnBack}>
        ← Cancel
      </Link>
    </div>
  );
};

// Inline styles equivalent to your scoped CSS
const styles = {
  confirmContainer: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#fff3f3',
    border: '1px solid #f5c6cb',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    color: '#dc3545',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '18px',
    marginBottom: '30px',
  },
  btnDanger: {
    padding: '10px 20px',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#dc3545',
    color: 'white',
    cursor: 'pointer',
  },
  btnBack: {
    marginTop: '20px',
    display: 'inline-block',
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '8px 14px',
    borderRadius: '6px',
    textDecoration: 'none',
  },
};

export default ConfirmDeletePurchase;
