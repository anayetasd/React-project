import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const DeleteSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({});

  const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/suppliers/${id}`;

  const handleDelete = async () => {
    if (window.confirm("Are you sure?")) {
      try {
        const response = await fetch(baseUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        if (response.ok) {
          alert("✅ Supplier deleted successfully!");
          navigate('/suppliers');
        } else {
          alert("❌ Delete failed!");
        }
      } catch (error) {
        console.error('Fetch Error:', error);
        alert("❌ Delete failed due to error!");
      }
    }
  };

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await fetch(baseUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        const data = await response.json();
        setSupplier(data.supplier || {});
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };

    fetchSupplier();
  }, [baseUrl]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Delete Supplier</h1>

      <Link to="/suppliers" style={styles.backLink}>← Back to List</Link>

      <div style={styles.confirmBox}>
        <h4 style={styles.confirmTitle}>Are you sure you want to delete this supplier?</h4>
        <p><strong>ID:</strong> {supplier.id}</p>
        <p><strong>Name:</strong> {supplier.name}</p>

        <button onClick={handleDelete} style={styles.deleteBtn}>Delete</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    fontFamily: `'Segoe UI', sans-serif`,
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#d32f2f',
  },
  backLink: {
    display: 'inline-block',
    marginBottom: '20px',
    color: '#1976d2',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  confirmBox: {
    backgroundColor: '#fefefe',
    border: '1px solid #e0e0e0',
    padding: '20px',
    borderRadius: '10px',
  },
  confirmTitle: {
    fontSize: '20px',
    marginBottom: '15px',
    color: '#333',
  },
  deleteBtn: {
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '15px',
    transition: 'background-color 0.3s',
  },
};

export default DeleteSupplier;
