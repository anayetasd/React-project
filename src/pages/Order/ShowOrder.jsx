import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ViewOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/orders/';

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${baseUrl}${id}`);
        const data = await res.json();
        console.log('Fetched order data:', data);
        setOrder(data.order ?? data); // API response অনুযায়ী adjust করুন
      } catch (error) {
        console.error('Error fetching order:', error);
        alert('Failed to load order data.');
        navigate('/orders');
      }
    };

    fetchOrder();
  }, [id, navigate]);

  const getProductName = (item) => {
    return item.product?.name || item.product_name || 'N/A';
  };

  const printInvoice = () => {
    const printContent = document.getElementById('printInvoice').innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  if (!order) return <div>Loading...</div>;

  const subtotal = order.order_details?.reduce((sum, d) => sum + d.qty * d.price, 0) || 0;
  const discountTotal = order.order_details?.reduce((sum, d) => sum + d.discount, 0) || 0;
  const paid = order.paid_amount || 0;
  const due = subtotal - discountTotal - paid;

  const styles = {
  container: {
    maxWidth: '1100px',
    margin: '40px auto',
    padding: '30px 40px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
  },
  heading: {
    textAlign: 'center',
    color: '#007bff',
    marginBottom: '30px',
    fontWeight: '700',
    fontSize: '2rem',
    letterSpacing: '1px',
  },
  infoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '25px',
  },
  infoTable: {
    fontSize: '15px',
    padding: '8px 10px',
    textAlign: 'left',
    width: '48%',
    borderCollapse: 'collapse',
  },
  productTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '25px',
  },
  productTableThTd: {
    border: '1px solid #ddd',
    padding: '10px 15px',
  },
  productTableTh: {
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: '600',
  },
  summary: {
    textAlign: 'right',
    fontSize: '16px',
    marginTop: '15px',
    fontWeight: '600',
  },
  backBtn: {
    display: 'inline-block',
    marginBottom: '20px',
    backgroundColor: '#28a745',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
  },
  printBtn: {
    backgroundColor: '#007bff',
    color: 'white',
    float: 'right',
    padding: '8px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    cursor: 'pointer',
  },
};


  return (
    <div style={styles.container} id="printInvoice">
  <Link to="/orders" style={styles.backBtn}>← Back to Orders</Link>
  <button onClick={printInvoice} style={styles.printBtn}>🖨 Print Invoice</button>

  <h2 style={styles.heading}>Sales Invoice</h2>

  <div style={styles.infoWrapper}>
    {order.customer && (
      <table style={styles.infoTable}>
        <tbody>
          <tr><td><strong>Customer Name:</strong></td><td>{order.customer.name}</td></tr>
          <tr><td><strong>Mobile:</strong></td><td>{order.customer.mobile || 'N/A'}</td></tr>
          <tr><td><strong>Email:</strong></td><td>{order.customer.email || 'N/A'}</td></tr>
        </tbody>
      </table>
    )}

    <table style={styles.infoTable}>
      <tbody>
        <tr><td><strong>Invoice ID:</strong></td><td>{order.id}</td></tr>
        <tr><td><strong>Order Date:</strong></td><td>{order.order_date ? new Date(order.order_date).toLocaleDateString() : 'N/A'}</td></tr>
        <tr><td><strong>Shipping Address:</strong></td><td>{order.shipping_address || 'N/A'}</td></tr>
      </tbody>
    </table>
    </div>

      <table style={styles.productTable}>
        <thead>
          <tr>
            <th style={{ ...styles.productTableThTd, ...styles.productTableTh }}>#</th>
            <th style={{ ...styles.productTableThTd, ...styles.productTableTh }}>Product</th>
            <th style={{ ...styles.productTableThTd, ...styles.productTableTh }}>Qty</th>
            <th style={{ ...styles.productTableThTd, ...styles.productTableTh }}>Rate</th>
            <th style={{ ...styles.productTableThTd, ...styles.productTableTh }}>Discount</th>
            <th style={{ ...styles.productTableThTd, ...styles.productTableTh }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.order_details?.map((item, index) => (
            <tr key={index}>
              <td style={styles.productTableThTd}>{index + 1}</td>
              <td style={styles.productTableThTd}>{getProductName(item)}</td>
              <td style={styles.productTableThTd}>{item.qty}</td>
              <td style={styles.productTableThTd}>৳{item.price.toFixed(2)}</td>
              <td style={styles.productTableThTd}>৳{item.discount.toFixed(2)}</td>
              <td style={styles.productTableThTd}>৳{(item.qty * item.price - item.discount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.summary}>
        <p><strong>Subtotal:</strong> ৳{subtotal.toFixed(2)}</p>
        <p><strong>Discount:</strong> ৳{discountTotal.toFixed(2)}</p>
        <p><strong>Paid:</strong> ৳{paid.toFixed(2)}</p>
        <p><strong>Due:</strong> ৳{due.toFixed(2)}</p>
      </div>

      <div style={{ textAlign: 'right', marginTop: 20 }}>
        <Link to="/mrs/create" className="btn btn-success">🧾 Money Receipt</Link>
      </div>
    </div>
  );
};

export default ViewOrder;
