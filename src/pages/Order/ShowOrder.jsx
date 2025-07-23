import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Invoice = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  useEffect(() => {
    fetch(`${baseUrl}/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Order response:", data);
        // Adjust if your API wraps data like { success: true, data: {...} }
        setOrder(data.data || data); 
      })
      .catch(err => console.error("Fetch error:", err));
  }, [id]);

  const printInvoice = () => {
    const content = document.getElementById("printInvoice").innerHTML;
    const original = document.body.innerHTML;
    document.body.innerHTML = content;
    window.print();
    document.body.innerHTML = original;
    window.location.reload();
  };

  if (!order) return <p>Loading...</p>;

  let subtotal = 0;
  let totalDiscount = 0;

  return (
    <div style={styles.container} id="printInvoice">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <Link to="/orders" style={styles.btnBack}>← Back to Orders</Link>
        <button onClick={printInvoice} style={styles.btnPrint}>🖨 Print Invoice</button>
      </div>

      <h2 style={styles.title}>Sales Invoice</h2>

      <table style={styles.infoTable}>
        <tbody>
          <tr><td><strong>Invoice ID:</strong></td><td>{order.id}</td></tr>
          <tr><td><strong>Order Date:</strong></td><td>{new Date(order.order_date).toLocaleDateString()}</td></tr>
          <tr><td><strong>Shipping Address:</strong></td><td>{order.shipping_address}</td></tr>
        </tbody>
      </table>

      {order.customer && (
        <table style={styles.infoTable}>
          <tbody>
            <tr><td><strong>Customer Name:</strong></td><td>{order.customer.name}</td></tr>
            <tr><td><strong>Mobile:</strong></td><td>{order.customer.mobile}</td></tr>
            <tr><td><strong>Email:</strong></td><td>{order.customer.email}</td></tr>
          </tbody>
        </table>
      )}

      <table style={styles.productTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Discount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.order_details?.map((item, index) => {
            const lineTotal = item.qty * item.price;
            subtotal += lineTotal;
            totalDiscount += item.discount;
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.product?.name ?? "N/A"}</td>
                <td>{item.qty}</td>
                <td>৳{item.price.toFixed(2)}</td>
                <td>৳{item.discount.toFixed(2)}</td>
                <td>৳{(lineTotal - item.discount).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={styles.summary}>
        <p><strong>Subtotal:</strong> ৳{subtotal.toFixed(2)}</p>
        <p><strong>Discount:</strong> ৳{totalDiscount.toFixed(2)}</p>
        <p><strong>Paid:</strong> ৳{order.paid_amount?.toFixed(2)}</p>
        <p><strong>Due:</strong> ৳{(subtotal - totalDiscount - (order.paid_amount ?? 0)).toFixed(2)}</p>
      </div>

      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Link to="/mrs/create" style={styles.moneyReceiptBtn}>🧾 Money Receipt</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#007bff",
    marginBottom: "25px",
  },
  infoTable: {
    marginBottom: "25px",
    width: "100%",
    borderSpacing: "0",
  },
  productTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  summary: {
    textAlign: "right",
    fontSize: "15px",
    marginTop: "15px",
  },
  btnBack: {
    display: "inline-block",
    backgroundColor: "#28a745",
    color: "white",
    padding: "8px 14px",
    borderRadius: "6px",
    textDecoration: "none",
  },
  btnPrint: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  moneyReceiptBtn: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "8px 14px",
    borderRadius: "6px",
    textDecoration: "none",
  },
};

export default Invoice;
