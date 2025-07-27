import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const StockDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState(null);

  const fetchStock = async () => {
    try {
      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/stocks/${id}`);
      const data = await res.json();
      setStock(data.stock || data);
    } catch (error) {
      alert('Failed to load stock data.');
      navigate('/stocks');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm('This action cannot be undone. Are you sure?')) return;

    try {
      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/stocks/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        alert('✅ Stock deleted successfully.');
        navigate('/stocks');
      } else {
        const errorData = await res.json();
        alert('❌ Delete failed: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      alert('❌ Delete failed due to server error.');
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <div className="confirm-container">
      {stock && (
        <>
          <Link className="btn btn-success btn-back" to="/stocks">← Back</Link>
          <h3>Are you sure you want to delete this stock?</h3>
          <div className="confirm-details">
            <p><strong>ID:</strong> {stock.id}</p>
            <p><strong>Product:</strong> {stock.product?.name || 'N/A'}</p>
            <p><strong>Qty:</strong> {stock.qty}</p>
            <p><strong>Warehouse:</strong> {stock.warehouse?.name || 'N/A'}</p>
          </div>
          <form onSubmit={handleDelete}>
            <input type="submit" className="btn btn-danger" value="Yes, Delete" />
          </form>
        </>
      )}
    </div>
  );
};

export default StockDelete;

// CSS Styling
const style = document.createElement('style');
style.innerHTML = `
.confirm-container {
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.confirm-container h3 {
  margin-bottom: 25px;
  font-weight: 700;
  color: #dc3545;
}

.confirm-details {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  text-align: left;
  font-size: 1.1rem;
  color: #333;
  box-shadow: inset 0 0 10px #e9ecef;
}

.confirm-details strong {
  display: inline-block;
  width: 110px;
}

.btn-danger {
  width: 100%;
  font-weight: 600;
  padding: 10px 0;
  font-size: 1.1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  border: none;
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #b02a37;
}

.btn-back {
  display: inline-block;
  margin-bottom: 20px;
  text-decoration: none;
}`;
document.head.appendChild(style);
