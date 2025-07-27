import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [customers, setCustomers] = useState([]);

  const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/';

  useEffect(() => {
  const fetchData = async () => {
    try {
      const orderRes = await fetch(`${baseUrl}orders/${id}`);
      const orderData = await orderRes.json();
      console.log('Order fetched:', orderData);
      setForm(orderData.order ?? orderData);

      const customerRes = await fetch(`${baseUrl}customers`);
      const customerData = await customerRes.json();
      console.log('Customers fetched:', customerData);
      setCustomers(customerData.customers ?? customerData);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  fetchData();
}, [id]);


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseUrl}orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert('✅ Order updated successfully!');
        navigate('/orders');
      } else {
        const err = await res.json();
        alert('❌ Failed: ' + (err.message || 'Something went wrong'));
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('❌ Server error during update.');
    }
  };

  const containerStyle = {
    maxWidth: '1000px',
    margin: '40px auto',
    background: '#ffffff',
    padding: '30px 40px',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0,0,0,0.08)',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  };

  const labelStyle = {
    fontWeight: 600,
    display: 'block',
    marginBottom: '8px',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '15px',
    boxSizing: 'border-box',
    resize: 'vertical',
  };

  const buttonStyle = {
    backgroundColor: '#005792',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s ease',
  };

  const backButtonStyle = {
    display: 'inline-block',
    margin: '20px auto 0 auto',
    padding: '10px 20px',
    backgroundColor: '#198754',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    transition: 'background-color 0.3s ease',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#005792',
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div style={containerStyle}>
      <Link to="/orders" style={backButtonStyle}>
        ← Back
      </Link>
      <h2 style={headingStyle}>Edit Order {form.id}</h2>

      <form onSubmit={handleUpdate}>
        <label style={labelStyle} htmlFor="customer_id">Customer</label>
        <select
          style={inputStyle}
          id="customer_id"
          value={form.customer_id}
          onChange={(e) => setForm({ ...form, customer_id: e.target.value })}
          required
        >
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>

        <label style={labelStyle} htmlFor="order_total">Order Total</label>
        <input
          style={inputStyle}
          type="text"
          id="order_total"
          value={form.order_total}
          onChange={(e) => setForm({ ...form, order_total: e.target.value })}
          required
        />

        <label style={labelStyle} htmlFor="discount">Discount</label>
        <input
          style={inputStyle}
          type="text"
          id="discount"
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
        />

        <label style={labelStyle} htmlFor="paid_amount">Paid Amount</label>
        <input
          style={inputStyle}
          type="text"
          id="paid_amount"
          value={form.paid_amount}
          onChange={(e) => setForm({ ...form, paid_amount: e.target.value })}
          required
        />

        <label style={labelStyle} htmlFor="shipping_address">Address</label>
        <textarea
          style={inputStyle}
          id="shipping_address"
          rows="4"
          value={form.shipping_address}
          onChange={(e) => setForm({ ...form, shipping_address: e.target.value })}
          required
        ></textarea>

        <input type="submit" value="Update" style={buttonStyle} />
      </form>
    </div>
  );
};

export default EditOrder;
