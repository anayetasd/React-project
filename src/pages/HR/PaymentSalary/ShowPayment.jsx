import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ShowEmployeeSalary = () => {
  const { id } = useParams();
  const [salary, setSalary] = useState(null);
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  useEffect(() => {
    fetch(`${baseUrl}/employeesalarys/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSalary(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  if (!salary) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <Link to="/employeesalarys" style={styles.backBtn}>
        ← Back to Employee Salary
      </Link>

      <h2 style={styles.title}>Employee Salary Details</h2>

      <table style={styles.table}>
        <tbody>
          <Row label="ID" value={salary.id} />
          <Row label="Name" value={salary.name} />
          <Row label="Payment Date" value={salary.payment_date} />
          <Row
            label="Administrator"
            value={salary.administrator?.role || "N/A"}
          />
          <Row
            label="Payment Method"
            value={salary.paymet?.name || "No Name"}
          />
          <Row label="Total Amount" value={salary.total_amount} />
          <Row label="Paid Amount" value={salary.paid_amount} />
        </tbody>
      </table>
    </div>
  );
};

const Row = ({ label, value }) => (
  <tr>
    <td style={styles.label}>{label}</td>
    <td style={styles.value}>{value}</td>
  </tr>
);

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontWeight: "bold",
    color: "#0d6efd",
  },
  backBtn: {
    marginBottom: "30px",
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#0d6efd",
    color: "white",
    fontWeight: "600",
    borderRadius: "8px",
    textDecoration: "none",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "16px",
  },
  label: {
    padding: "14px 18px",
    borderBottom: "1px solid #dee2e6",
    backgroundColor: "#f1f3f5",
    fontWeight: "600",
    color: "#333",
    width: "35%",
    verticalAlign: "top",
  },
  value: {
    padding: "14px 18px",
    borderBottom: "1px solid #dee2e6",
    color: "#212529",
    verticalAlign: "top",
  },
};

export default ShowEmployeeSalary;
