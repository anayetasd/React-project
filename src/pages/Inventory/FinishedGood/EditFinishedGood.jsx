import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditFinishedGood = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    product_name: '',
    quantity: '',
    price: '',
    order_date: '',
    finished_good_status: '',
  });

  useEffect(() => {
    const fetchFinishedGood = async () => {
      try {
        const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/finishedgoods/${id}`);
        const data = await res.json();
        setForm(data.finishedgood || data.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchFinishedGood();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateFinishedGood = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/finishedgoods/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Update failed');
      const result = await res.json();
      console.log('Updated:', result);
      navigate('/finishedgoods');
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <div className="form-wrapper">
      <Link className="btn-back" to="/finishedgoods">← Back to Finished Goods</Link>
      <h2>Edit Finished Good</h2>
      <form onSubmit={updateFinishedGood}>
        <div className="form-group">
          <label htmlFor="product_name">Product Name</label>
          <input
            type="text"
            name="product_name"
            id="product_name"
            value={form.product_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="order_date">Order Date</label>
          <input
            type="date"
            name="order_date"
            id="order_date"
            value={form.order_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="finished_good_status">Status</label>
          <input
            type="text"
            name="finished_good_status"
            id="finished_good_status"
            value={form.finished_good_status}
            onChange={handleChange}
            required
          />
        </div>

        <input type="submit" value="Update Finished Good" />
      </form>

      <style>{`
        .form-wrapper {
          max-width: 1000px;
          margin: 40px auto;
          background: #ffffff;
          padding: 30px 40px;
          border-radius: 15px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', sans-serif;
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

        input[type='text'],
        input[type='number'],
        input[type='date'],
        select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
        }

        input[type='submit'] {
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

        input[type='submit']:hover {
          background-color: #084fc2;
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

export default EditFinishedGood;
