import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateFinishedGood = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    product_name: '',
    quantity: '',
    price: '',
    order_date: '',
    finished_good_status: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        'http://anayet.intelsofts.com/project_app/public/api/finishedgoods',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to save finished good');
      }

      const data = await response.json();
      console.log('Saved:', data);
      alert('Finished Good saved successfully!');
      navigate('/finishedGoods');
    } catch (error) {
      console.error('Error saving finished good:', error);
      alert('Failed to save finished good: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <a className="btn-back" href="/finishedGoods">← Back to Finished Goods</a>
      <h2>Add New Finished Good</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product_name">Product Name</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={form.product_name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            min="0"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="order_date">Order Date</label>
          <input
            type="date"
            id="order_date"
            name="order_date"
            value={form.order_date}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="finished_good_status">Status</label>
          <select
            id="finished_good_status"
            name="finished_good_status"
            value={form.finished_good_status}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">-- Select Status --</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <input
          type="submit"
          value={loading ? 'Saving...' : 'Save Finished Good'}
          disabled={loading}
        />
      </form>

      {/* Inline CSS */}
      <style>{`
        .form-wrapper {
          max-width: 1000px;
          margin: 40px auto;
          background: #ffffff;
          padding: 30px 40px;
          border-radius: 15px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          font-family: "Segoe UI", sans-serif;
        }

        .form-wrapper h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #0d6efd;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          font-weight: 600;
          display: block;
          margin-bottom: 8px;
          color: #333;
        }

        input[type="text"],
        input[type="number"],
        input[type="date"],
        select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
        }

        input[type="submit"] {
          background-color: #0d6efd;
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
          width: 100%;
          margin-top: 15px;
        }

        input[type="submit"]:hover:not(:disabled) {
          background-color: #084fc2;
        }

        input[type="submit"]:disabled {
          background-color: #7baaf7;
          cursor: not-allowed;
        }

        .btn-back {
          display: inline-block;
          margin-bottom: 20px;
          color: white;
          background: #6c757d;
          padding: 10px 20px;
          border-radius: 6px;
          text-decoration: none;
          transition: 0.3s;
        }

        .btn-back:hover {
          background: #5a6268;
        }
      `}</style>
    </div>
  );
};

export default CreateFinishedGood;
