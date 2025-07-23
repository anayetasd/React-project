import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ShowFinishedGood = () => {
  const { id } = useParams();
  const [finishedGood, setFinishedGood] = useState(null);
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  useEffect(() => {
    fetch(`${baseUrl}/finishedgoods/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setFinishedGood(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  if (!finishedGood) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <Link to="/finishedgoods" style={styles.backButton}>← Back to Finished Goods</Link>

      <h2 style={styles.heading}>Finished Good Details</h2>

      <table style={styles.table}>
        <tbody>
          <tr>
            <td style={styles.label}>ID</td>
            <td>{finishedGood.id}</td>
          </tr>
          <tr>
            <td style={styles.label}>Product Name</td>
            <td>{finishedGood.product_name}</td>
          </tr>
          <tr>
            <td style={styles.label}>Quantity</td>
            <td>{finishedGood.quantity}</td>
          </tr>
          <tr>
            <td style={styles.label}>Price</td>
            <td>{finishedGood.price}</td>
          </tr>
          <tr>
            <td style={styles.label}>Order Date</td>
            <td>{finishedGood.order_date}</td>
          </tr>
          <tr>
            <td style={styles.label}>Status</td>
            <td>{finishedGood.finished_good_status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "950px",
    margin: "40px auto",
    background: "#fff",
    padding: "30px 40px",
    borderRadius: "15px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#0d6efd",
  },
  backButton: {
    display: "inline-block",
    marginBottom: "20px",
    background: "#28a745",
    color: "white",
    padding: "10px 20px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "15px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  label: {
    fontWeight: "bold",
    backgroundColor: "#f8f9fa",
    padding: "12px 15px",
    width: "40%",
    border: "1px solid #ddd",
    color: "#333",
  },
};

export default ShowFinishedGood;
