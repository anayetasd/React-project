import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ViewCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  useEffect(() => {
    fetch(`${baseUrl}/customers/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Customer data:", data);
        setCustomer(data.data || data); // Adjust if your response uses data wrapper
      })
      .catch(err => console.error("Fetch error:", err));
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Customer Details</h2>
        <Link to="/customers" style={styles.btnBack}>← Back</Link>
      </div>

      <table style={styles.table}>
        <tbody>
          <tr>
            <td style={styles.label}>ID</td>
            <td>{customer.id}</td>
          </tr>
          <tr>
            <td style={styles.label}>Name</td>
            <td>{customer.name}</td>
          </tr>
          <tr>
            <td style={styles.label}>Mobile</td>
            <td>{customer.mobile}</td>
          </tr>
          <tr>
            <td style={styles.label}>Email</td>
            <td>{customer.email}</td>
          </tr>
          <tr>
            <td style={styles.label}>Address</td>
            <td>{customer.address}</td>
          </tr>
          <tr>
            <td style={styles.label}>Photo</td>
            <td>
              {customer.photo ? (
                <img
                  src={`http://anayet.intelsofts.com/project_app/public/img/${customer.photo}`}
                  alt="Customer"
                  style={styles.image}
                />
              ) : (
                <span style={{ color: "#888" }}>No photo available</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "50px auto",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    margin: 0,
  },
  btnBack: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px 16px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  label: {
    padding: "15px 12px",
    borderBottom: "1px solid #eaeaea",
    verticalAlign: "top",
    fontWeight: "600",
    color: "#555",
    width: "30%",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
};

export default ViewCustomer;
