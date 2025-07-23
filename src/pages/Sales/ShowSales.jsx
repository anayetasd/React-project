import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ShowSale = () => {
  const { id } = useParams();
  const [sale, setSale] = useState(null);
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  useEffect(() => {
    fetch(`${baseUrl}/sales/${id}`)
      .then((res) => res.json())
      .then((data) => setSale(data))
      .catch((error) => console.error("Error fetching sale:", error));
  }, [id]);

  if (!sale) return <div className="loading">Loading...</div>;

  return (
    <div style={styles.body}>
      <div style={styles.viewContainer}>
        <Link to="/sales" style={styles.btnBack}>
          Back
        </Link>

        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.label}>Id</td>
              <td>{sale.id}</td>
            </tr>
            <tr>
              <td style={styles.label}>Total Amount</td>
              <td>{sale.total_amount}</td>
            </tr>
            <tr>
              <td style={styles.label}>Discount</td>
              <td>{sale.discount}</td>
            </tr>
            <tr>
              <td style={styles.label}>Status</td>
              <td>{sale.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "#f4f6f8",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "50px 15px",
  },
  viewContainer: {
    maxWidth: "950px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "30px 40px",
    borderRadius: "10px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
  },
  btnBack: {
    display: "inline-block",
    marginBottom: "25px",
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px 20px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "16px",
  },
  label: {
    fontWeight: "600",
    width: "35%",
    color: "#555",
    padding: "12px 15px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
  },
};

export default ShowSale;
