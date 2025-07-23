import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../CSS/ShowPurchases.css";

const PurchaseInvoice = () => {
  const { id } = useParams();
  const [purchase, setPurchase] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  useEffect(() => {
    fetch(`${baseUrl}/purchases/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const purchaseData = data.data || data;
        setPurchase(purchaseData);
        const sub = purchaseData.details
          ? purchaseData.details.reduce((acc, item) => acc + item.qty * item.price, 0)
          : 0;
        setSubtotal(sub);
      })
      .catch(() => {
        alert("Failed to load purchase data.");
      });
  }, [id]);

  const printInvoice = () => {
    const content = document.getElementById("printInvoice").innerHTML;
    const original = document.body.innerHTML;
    document.body.innerHTML = content;
    window.print();
    document.body.innerHTML = original;
  };

  if (!purchase) return <p>Loading...</p>;

  const due = subtotal - (parseFloat(purchase.discount) || 0) - (parseFloat(purchase.paid_amount) || 0);

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <Link className="btn-back" to="/purchases">← Back to Purchases</Link>
        <button className="btn-print" onClick={printInvoice}>🖨 Print Invoice</button>
      </div>

      <div id="printInvoice">
        <h2 className="title">Purchase Invoice</h2>

        <table className="invoice-info">
          <tbody>
            <tr>
              <td><strong>Invoice ID:</strong></td>
              <td>{purchase.id}</td>
            </tr>
            <tr>
              <td><strong>Purchase Date:</strong></td>
              <td>{purchase.purchase_date ? new Date(purchase.purchase_date).toLocaleDateString() : '-'}</td>
            </tr>
            <tr>
              <td><strong>Shipping Address:</strong></td>
              <td>{purchase.shipping_address || '-'}</td>
            </tr>
          </tbody>
        </table>

        {purchase.supplier && (
          <table className="supplier-info">
            <tbody>
              <tr>
                <td><strong>Supplier Name:</strong></td>
                <td>{purchase.supplier.name || '-'}</td>
              </tr>
              <tr>
                <td><strong>Mobile:</strong></td>
                <td>{purchase.supplier.mobile || '-'}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{purchase.supplier.email || '-'}</td>
              </tr>
            </tbody>
          </table>
        )}

        <table className="product-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {purchase.details && purchase.details.length > 0 ? (
              purchase.details.map((detail, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{detail.product?.name || "No Product"}</td>
                  <td>{detail.qty}</td>
                  <td>৳{parseFloat(detail.price).toFixed(2)}</td>
                  <td>৳{(detail.qty * detail.price).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>No products found</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="summary">
          <p><strong>Subtotal:</strong> ৳{subtotal.toFixed(2)}</p>
          <p><strong>Discount:</strong> ৳{parseFloat(purchase.discount || 0).toFixed(2)}</p>
          <p><strong>Paid:</strong> ৳{parseFloat(purchase.paid_amount || 0).toFixed(2)}</p>
          <p><strong>Due:</strong> ৳{due.toFixed(2)}</p>
        </div>

        <div className="btn-right">
          <Link className="btn btn-success" to="/mrs/create">🧾 Money Receipt</Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseInvoice;
