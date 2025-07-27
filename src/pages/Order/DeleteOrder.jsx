import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const DeleteOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/';
  const endpoint = `orders/${id}`;

 useEffect(() => {
  const fetchOrder = async () => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        // Adjust here based on actual response structure:
        setOrder(data.order ?? data ?? {});
      } else {
        alert('Failed to load order data');
        navigate('/orders');
      }
    } catch (error) {
      alert('Error fetching order data: ' + error.message);
      navigate('/orders');
    }
  };

  fetchOrder();
}, [id]);


  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const res = await fetch(`${baseUrl}${endpoint}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (res.ok) {
          alert('Order deleted successfully.');
          navigate('/orders');
        } else {
          const data = await res.json();
          alert('Delete failed: ' + (data.message || 'Unknown error'));
        }
      } catch (error) {
        alert('Error deleting order: ' + error.message);
        console.error(error);
      }
    }
  };

  return (
    <div className="delete-container">
      <h1>Delete Order</h1>
      <Link className="btn-back" to="/orders">← Back to Orders</Link>

      {order?.id ? (
        <div className="delete-box">
          <h3>Are you sure you want to delete this order?</h3>
          <ul>
            <li><strong>Order ID:</strong> {order.id}</li>
            <li><strong>Order Total:</strong> {order.order_total}</li>
            <li><strong>Customer Name:</strong> {order.customer?.name || 'N/A'}</li>
          </ul>

          

          <button className="btn-delete" onClick={handleDelete}>Confirm Delete</button>
        </div>
      ) : (
        <div>Loading order data...</div>
      )}

      <style>{`
        .delete-container {
          max-width: 600px;
          margin: 40px auto;
          background: #fff;
          padding: 30px 40px;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
          font-family: 'Segoe UI', sans-serif;
        }

        h1 {
          text-align: center;
          color: #dc3545;
          margin-bottom: 20px;
        }

        .delete-box {
          background-color: #fff3f3;
          padding: 25px;
          border: 1px solid #f5c6cb;
          border-radius: 10px;
          text-align: left;
        }

        .delete-box h3 {
          color: #c82333;
          margin-bottom: 15px;
          text-align: center;
        }

        .delete-box ul {
          list-style-type: none;
          padding: 0;
          margin-bottom: 20px;
        }

        .delete-box li {
          padding: 6px 0;
          font-size: 16px;
          color: #333;
        }

        .btn-delete {
          background-color: #dc3545;
          color: white;
          padding: 10px 18px;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          font-size: 15px;
          cursor: pointer;
          transition: 0.3s ease;
          width: 100%;
        }

        .btn-delete:hover {
          background-color: #c82333;
        }

        .btn-back {
          display: inline-block;
          margin-bottom: 20px;
          background-color: #6c757d;
          color: white;
          padding: 8px 14px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
          transition: 0.3s ease;
        }

        .btn-back:hover {
          background-color: #5a6268;
        }
      `}</style>
    </div>
  );
};

export default DeleteOrder;
