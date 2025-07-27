import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ProductionDeleteConfirm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/';

  const [production, setProduction] = useState(null);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch production
        const prodRes = await fetch(`${baseUrl}productions/${id}`, {
          headers: { Accept: 'application/json' },
        });
        if (!prodRes.ok) throw new Error('Failed to fetch production');
        const prodData = await prodRes.json();
        setProduction(prodData.production);

        // Fetch product by product_id
        if (prodData.production?.product_id) {
          const prodInfoRes = await fetch(`${baseUrl}products/${prodData.production.product_id}`, {
            headers: { Accept: 'application/json' },
          });
          if (!prodInfoRes.ok) throw new Error('Failed to fetch product');
          const prodInfoData = await prodInfoRes.json();
          // Adjust here depending on response structure:
          setProduct(prodInfoData.product || prodInfoData);
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this production?')) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${baseUrl}productions/${id}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        alert('Deleted successfully.');
        navigate('/productions');
      } else {
        const data = await res.json();
        alert('Delete failed: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Error deleting production.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</div>;
  if (!production) return <div style={{ textAlign: 'center', marginTop: 20 }}>Loading...</div>;

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '50px auto',
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 10,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}
    >
      <Link
        to="/productions"
        style={{
          margin: 20,
          padding: '8px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          borderRadius: 6,
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        ← Back
      </Link>

      <p style={{ fontSize: 18, color: '#555', marginBottom: 25 }}>
        Are you sure you want to delete this production?
      </p>

      <h2 style={{ margin: '10px 0', color: '#333' }}>Production Date: {production.production_date}</h2>
      
      <h2 style={{ margin: '10px 0', color: '#333' }}>Total Produced: {production.quantity_produced}</h2>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        style={{
          backgroundColor: '#dc3545',
          border: 'none',
          padding: '10px 25px',
          color: '#fff',
          fontSize: 16,
          borderRadius: 6,
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#c82333')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#dc3545')}
      >
        {isDeleting ? 'Deleting...' : 'Confirm Delete'}
      </button>
    </div>
  );
};

export default ProductionDeleteConfirm;
