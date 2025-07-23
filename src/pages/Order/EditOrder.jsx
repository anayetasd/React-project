import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [form, setForm] = useState({
    customer_id: "",
    order_total: "",
    discount: "",
    paid_amount: "",
    shipping_address: ""
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Get Order Details
    fetch(`${baseUrl}/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.id) setForm(data);
      });

    // Get Customer List
    fetch(`${baseUrl}/customers`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCustomers(data);
        else if (Array.isArray(data.data)) setCustomers(data.data); // optional structure handling
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then(() => navigate("/orders"))
      .catch((err) => console.error("Update error:", err));
  };

  return (
    <>
      <Link className="btn-back" to="/orders">Back</Link>

      <div className="form-container">
        <h2>Edit Order #{id}</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="customer_id">Customer</label>
          <select
            name="customer_id"
            value={form.customer_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>

          <label htmlFor="order_total">Order Total</label>
          <input
            type="text"
            name="order_total"
            value={form.order_total}
            onChange={handleChange}
            required
          />

          <label htmlFor="discount">Discount</label>
          <input
            type="text"
            name="discount"
            value={form.discount}
            onChange={handleChange}
          />

          <label htmlFor="paid_amount">Paid Amount</label>
          <input
            type="text"
            name="paid_amount"
            value={form.paid_amount}
            onChange={handleChange}
            required
          />

          <label htmlFor="shipping_address">Address</label>
          <textarea
            name="shipping_address"
            rows="4"
            value={form.shipping_address}
            onChange={handleChange}
            required
          ></textarea>

          <input type="submit" value="Update" />
        </form>
      </div>

      <style>{`
        .form-container {
          max-width: 1000px;
          margin: 40px auto;
          background: #ffffff;
          padding: 30px 40px;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0,0,0,0.08);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .form-container h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #005792;
        }

        label {
          font-weight: 600;
          display: block;
          margin-bottom: 8px;
          color: #333;
        }

        select, input[type="text"], textarea {
          width: 100%;
          padding: 10px 12px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
          box-sizing: border-box;
          resize: vertical;
        }

        input[type="submit"] {
          background-color: #005792;
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          width: 100%;
          transition: background-color 0.3s ease;
        }

        input[type="submit"]:hover {
          background-color: #003f66;
        }

        .btn-back {
          display: inline-block;
          margin: 20px auto 0 auto;
          padding: 10px 20px;
          background-color: #198754;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }

        .btn-back:hover {
          background-color: #145c32;
        }
      `}</style>
    </>
  );
};

export default EditOrder;
