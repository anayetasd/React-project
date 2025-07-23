import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateSale = () => {
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    id: "",
    customer_id: "",
    total_amount: "",
    discount: "",
    status: "",
    created_at: "",
  });

  useEffect(() => {
    fetch(`${baseUrl}/customers`)
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error("Failed to load customers:", err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${baseUrl}/sales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/sales");
        } else {
          alert("Failed to create sale");
        }
      })
      .catch((err) => console.error("Create failed:", err));
  };

  return (
    <div className="create-container">
      <style>{`
        body {
          background-color: #f4f6f8;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .create-container {
          max-width: 1000px;
          margin: 50px auto;
          background-color: #ffffff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
        }

        .form-title {
          text-align: center;
          margin-bottom: 30px;
          font-size: 28px;
          font-weight: bold;
          color: #333;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #555;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 15px;
          background-color: #fafafa;
        }

        .form-actions {
          text-align: center;
          margin-top: 30px;
        }

        .btn-submit {
          background-color: #007bff;
          color: white;
          padding: 12px 28px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          transition: 0.3s ease;
        }

        .btn-submit:hover {
          background-color: #0056b3;
          cursor: pointer;
        }
      `}</style>

      <h2 className="form-title">Create New Sale</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID</label>
          <input type="text" name="id" value={form.id} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Customer ID</label>
          <select name="customer_id" value={form.customer_id} onChange={handleChange} required>
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Total Amount</label>
          <input type="text" name="total_amount" value={form.total_amount} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Discount</label>
          <input type="text" name="discount" value={form.discount} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Status</label>
          <input type="text" name="status" value={form.status} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Created At</label>
          <input type="text" name="created_at" value={form.created_at} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default CreateSale;
