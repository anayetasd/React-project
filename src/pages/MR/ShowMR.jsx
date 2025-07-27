import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ShowMoneyReceipt = () => {
  const { id } = useParams();
  const [mr, setMr] = useState(null);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchMR = async () => {
      try {
        const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/mrs/${id}`, {
          headers: {
            Accept: "application/json",
          },
        });
        const data = await res.json();
        const receipt = data.mr ?? data;

        if (!receipt.customer) {
          receipt.customer = { name: "N/A", email: "N/A", mobile: "N/A" };
        }
        if (!Array.isArray(receipt.mr_details)) {
          receipt.mr_details = [];
        }

        setMr(receipt);
        calculateSubtotal(receipt.mr_details);
      } catch (err) {
        console.error("❌ Failed to fetch MR:", err);
      }
    };

    fetchMR();
  }, [id]);

  const calculateSubtotal = (details) => {
    const total = details.reduce((acc, item) => {
      const qty = parseFloat(item.qty || 0);
      const price = parseFloat(item.price || 0);
      return acc + qty * price;
    }, 0);
    setSubtotal(total);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatNumber = (num) => parseFloat(num).toFixed(2);

  const printInvoice = () => {
    const printContents = document.getElementById("printMR").innerHTML;
    const printWindow = window.open("", "", "height=600,width=900");
    printWindow.document.write("<html><head><title>Print Invoice</title>");
    printWindow.document.write("</head><body>");
    printWindow.document.write(printContents);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div style={styles.container} id="printMR">
      <Link to="/mrs" style={styles.btnBack}>
        ← Back to Receipts
      </Link>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          printInvoice();
        }}
        style={styles.btnPrint}
      >
        🖨 Print Invoice
      </a>

      <div style={styles.header}>Money Receipt</div>

      {mr && mr.customer && (
        <div style={styles.infoSection}>
          <table style={styles.infoTable}>
            <tbody>
              <tr>
                <td>
                  <strong>Customer Name:</strong>
                </td>
                <td>{mr.customer.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Mobile:</strong>
                </td>
                <td>{mr.customer.mobile}</td>
              </tr>
              <tr>
                <td>
                  <strong>Email:</strong>
                </td>
                <td>{mr.customer.email}</td>
              </tr>
            </tbody>
          </table>

          <table style={styles.infoTable}>
            <tbody>
              <tr>
                <td>
                  <strong>Receipt ID:</strong>
                </td>
                <td>{mr.id}</td>
              </tr>
              <tr>
                <td>
                  <strong>Date:</strong>
                </td>
                <td>{formatDate(mr.mr_date)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Shipping Address:</strong>
                </td>
                <td>{mr.shipping_address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {mr && mr.mr_details?.length > 0 && (
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Rate</th>
              <th style={styles.th}>Total</th>
            </tr>
          </thead>
          <tbody>
            {mr.mr_details.map((item, index) => (
              <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{mr.customer?.name || "N/A"}</td>
                <td style={styles.td}>{item.qty}</td>
                <td style={styles.td}>৳{formatNumber(item.price)}</td>
                <td style={styles.td}>৳{formatNumber(item.qty * item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {mr && (
        <div style={styles.summary}>
          <p>
            <strong>Subtotal:</strong> ৳{formatNumber(subtotal)}
          </p>
          <p>
            <strong>Discount:</strong> ৳{formatNumber(mr.discount || 0)}
          </p>
          <p>
            <strong>Paid:</strong> ৳{formatNumber(mr.paid_amount || 0)}
          </p>
          <p>
            <strong>Due:</strong> ৳
            {formatNumber(subtotal - (mr.discount || 0) - (mr.paid_amount || 0))}
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#007bff",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "bold",
  },
  infoSection: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
    flexWrap: "wrap",
  },
  infoTable: {
    width: "48%",
    fontSize: "15px",
    borderSpacing: "0px",
    border: "1px solid #dee2e6",
    borderCollapse: "collapse",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    textAlign: "center",
    boxShadow: "0 0 8px rgb(0 0 0 / 0.1)",
    border: "1px solid #dee2e6",
  },
  thead: {
    backgroundColor: "#0d6efd",
    color: "white",
    fontSize: "14px",
  },
  th: {
    padding: "12px",
    border: "1px solid #dee2e6",
  },
  td: {
    border: "1px solid #dee2e6",
    padding: "10px",
  },
  evenRow: {
    backgroundColor: "#f8f9fa",
  },
  oddRow: {
    backgroundColor: "white",
  },
  summary: {
    textAlign: "right",
    fontSize: "15px",
    marginTop: "20px",
  },
  btnBack: {
    display: "inline-block",
    marginBottom: "20px",
    backgroundColor: "#28a745",
    color: "white",
    padding: "8px 14px",
    borderRadius: "6px",
    textDecoration: "none",
  },
  btnPrint: {
    float: "right",
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 14px",
    borderRadius: "6px",
    textDecoration: "none",
    marginBottom: "20px",
  },
};

export default ShowMoneyReceipt;
