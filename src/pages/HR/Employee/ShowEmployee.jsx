import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/employees/${id}`);
        if (!res.ok) throw new Error("Failed to fetch employee");
        const data = await res.json();
        setEmployee(data.employee ?? data);
      } catch (error) {
        console.error("Failed to fetch employee:", error);
      }
    };
    fetchEmployee();
  }, [id]);

  return (
    <div style={styles.detailContainer}>
      <Link to="/employees" style={styles.btnBack}>
        ← Back
      </Link>

      <h2 style={styles.heading}>Employee Details</h2>

      {employee && (
        <table style={styles.detailTable}>
          <tbody>
            <tr>
              <td style={styles.firstTd}>ID</td>
              <td style={styles.lastTd}>{employee.id}</td>
            </tr>
            <tr>
              <td style={styles.firstTd}>Name</td>
              <td style={styles.lastTd}>{employee.name}</td>
            </tr>
            <tr>
              <td style={styles.firstTd}>Shift</td>
              <td style={styles.lastTd}>{employee.shift?.name ?? "N/A"}</td>
            </tr>
            <tr>
              <td style={styles.firstTd}>Category</td>
              <td style={styles.lastTd}>{employee.categorie?.name ?? "N/A"}</td>
            </tr>
            <tr>
              <td style={styles.firstTd}>Joining Date</td>
              <td style={styles.lastTd}>{employee.joining_date}</td>
            </tr>
            <tr>
              <td style={styles.firstTd}>Address</td>
              <td style={styles.lastTd}>{employee.address}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  detailContainer: {
    maxWidth: 1150,
    margin: "40px auto",
    backgroundColor: "#ffffff",
    padding: 40,
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: 35,
    color: "#005792",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  detailTable: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 16,
  },
  firstTd: {
    padding: "14px 16px",
    fontWeight: 600,
    color: "#333",
    width: "35%",
    backgroundColor: "#f0f4f8",
    borderRight: "1px solid #e0e0e0",
  },
  lastTd: {
    padding: "14px 16px",
    backgroundColor: "#fafafa",
    color: "#555",
  },
  btnBack: {
    display: "inline-block",
    margin: "20px 0 0 40px",
    textDecoration: "none",
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px 20px",
    borderRadius: 8,
    fontSize: 15,
    transition: "background-color 0.3s ease",
  },
};


export default EmployeeDetails;
