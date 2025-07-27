import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';


const PurchaseInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [purchase, setPurchase] = useState({});
  const [details, setDetails] = useState([]);
  const [supplier, setSupplier] = useState({});
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(
          `http://anayet.intelsofts.com/project_app/public/api/purchases/${id}`,
          { headers: { Accept: 'application/json' } }
        );
        const data = await response.json();
        const found = data.purchase || {};

        setPurchase(found);
        setSupplier(found.supplier || {});
        const detailList = found.details || [];
        setDetails(detailList);

        const total = detailList.reduce((sum, item) => {
          const qty = parseFloat(item.qty || 0);
          const price = parseFloat(item.price || 0);
          const discount = parseFloat(item.discount || 0);
          return sum + (qty * price - discount);
        }, 0);

        setSubtotal(total);
      } catch (err) {
        console.error('Error fetching invoice:', err);
      }
    };

    fetchInvoice();
  }, [id]);

  const formatNumber = (num) => parseFloat(num || 0).toFixed(2);

  const printInvoice = () => {
    const printContents = document.getElementById('printInvoice').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=900');
    printWindow.document.write('<html><head><title>Print Invoice</title>');
    printWindow.document.write('<style>');
    printWindow.document.write(document.getElementById('invoiceStyles').innerHTML); // use styles from same file
    printWindow.document.write('</style></head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <style id="invoiceStyles">{`
        .invoice-container {
          max-width: 1100px;
          margin: 30px auto;
          background: #fff;
          padding: 30px 40px;
          border: 1px solid #ddd;
          font-family: 'Segoe UI', sans-serif;
        }

        .btn-back {
          text-decoration: none;
          background: #ccc;
          padding: 6px 12px;
          border-radius: 5px;
          color: #000;
          margin-bottom: 20px;
          display: inline-block;
        }

        .btn-print {
          float: right;
          text-decoration: none;
          background: #28a745;
          color: #fff;
          padding: 6px 12px;
          border-radius: 5px;
        }

        h2 {
          text-align: center;
          margin: 20px 0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th, td {
          border: 1px solid #ddd;
          padding: 8px 10px;
          text-align: left;
        }

        th {
          background-color: #f4f4f4;
        }

        .invoice-info td, .supplier-info td {
          border: none;
          padding: 5px;
        }

        .summary {
          margin-top: 20px;
          text-align: right;
        }

        .summary p {
          margin: 5px 0;
        }

        @media print {
          .btn-print, .btn-back, .btn-success {
            display: none !important;
          }

          .invoice-container {
            box-shadow: none;
            border: none;
            margin: 0;
            padding: 0;
          }

          body {
            margin: 0;
          }
        }
      `}</style>

      <div className="invoice-container" id="printInvoice">
        <Link className="btn-back" to="/purchases">← Back to Purchases</Link>
        <a className="btn-print" href="#" onClick={(e) => { e.preventDefault(); printInvoice(); }}>
          🖨 Print Invoice
        </a>

        <h2>Purchase Invoice</h2>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <table className="supplier-info" style={{ width: '48%' }}>
            <tbody>
              <tr><td><strong>Supplier Name:</strong></td><td>{supplier.name || 'N/A'}</td></tr>
              <tr><td><strong>Mobile:</strong></td><td>{supplier.mobile || 'N/A'}</td></tr>
              <tr><td><strong>Email:</strong></td><td>{supplier.email || 'N/A'}</td></tr>
            </tbody>
          </table>

          <table className="invoice-info" style={{ width: '48%' }}>
            <tbody>
              <tr><td><strong>Invoice ID:</strong></td><td>{purchase.id || 'N/A'}</td></tr>
              <tr><td><strong>Purchase Date:</strong></td><td>{purchase.purchase_date ? new Date(purchase.purchase_date).toLocaleDateString() : 'N/A'}</td></tr>
              <tr><td><strong>Shipping Address:</strong></td><td>{purchase.shipping_address || 'N/A'}</td></tr>
            </tbody>
          </table>
        </div>


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
            {details.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.product?.name || item.product_name || 'No Product'}</td>
                <td>{item.qty}</td>
                <td>৳{formatNumber(item.price)}</td>
                <td>৳{formatNumber(item.qty * item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="summary">
          <p><strong>Subtotal:</strong> ৳{formatNumber(subtotal)}</p>
          <p><strong>Discount:</strong> ৳{formatNumber(purchase.discount)}</p>
          <p><strong>Paid:</strong> ৳{formatNumber(purchase.paid_amount)}</p>
          <p><strong>Due:</strong> ৳{formatNumber(subtotal - (purchase.discount || 0) - (purchase.paid_amount || 0))}</p>
        </div>

        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <Link className="btn btn-success" to="/mrs/create">🧾 Money Receipt</Link>
        </div>
      </div>
    </>
  );
};

export default PurchaseInvoice;
