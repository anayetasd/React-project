import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EmployeeSalaryDetails = () => {
  const { id } = useParams();
  const [employeesalary, setEmployeeSalary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/employeesalarys/${id}`);
        const data = await res.json();
        setEmployeeSalary(data.employeesalary ?? data);
      } catch (error) {
        console.error("Error fetching salary details:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!employeesalary) return null;

  return (
    <div style={styles.viewContainer}>
      <Link to="/employeesalarys" style={styles.btnBack}>← Back to Employee Salary</Link>

      <h2 style={styles.heading}>Employee Salary Details</h2>

      <table style={styles.tableCustom}>
        <tbody>
          <tr>
            <td style={styles.tdFirst}>ID</td>
            <td>{employeesalary.id}</td>
          </tr>
          <tr style={styles.evenRow}>
            <td style={styles.tdFirst}>Name</td>
            <td>{employeesalary.name}</td>
          </tr>
          <tr>
            <td style={styles.tdFirst}>Payment Date</td>
            <td>{employeesalary.payment_date}</td>
          </tr>
          <tr style={styles.evenRow}>
            <td style={styles.tdFirst}>Administrator</td>
            <td>{employeesalary.administrator?.role ?? "N/A"}</td>
          </tr>
          <tr>
            <td style={styles.tdFirst}>Payment Method</td>
            <td>{employeesalary.payment?.name ?? "No Name"}</td>
          </tr>
          <tr style={styles.evenRow}>
            <td style={styles.tdFirst}>Total Amount</td>
            <td>{employeesalary.total_amount}</td>
          </tr>
          <tr>
            <td style={styles.tdFirst}>Paid Amount</td>
            <td>{employeesalary.paid_amount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  viewContainer: {
    maxWidth: 1000,
    margin: "40px auto",
    backgroundColor: "#ffffff",
    padding: 40,
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "bold",
    color: "#0d6efd",
  },
  btnBack: {
    marginBottom: 30,
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#0d6efd",
    color: "white",
    fontWeight: 600,
    borderRadius: 8,
    textDecoration: "none",
    transition: "background-color 0.3s",
  },
  tableCustom: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 16,
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  tdFirst: {
    fontWeight: 600,
    backgroundColor: "#f1f3f5",
    width: "35%",
    color: "#333",
    padding: "14px 18px",
    borderBottom: "1px solid #dee2e6",
    verticalAlign: "top",
  },
};

export default EmployeeSalaryDetails;
