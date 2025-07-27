import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const DeleteEmployeeSalary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeesalary, setEmployeeSalary] = useState(null);

  useEffect(() => {
    const fetchEmployeeSalary = async () => {
      try {
        const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/employeesalarys/${id}`);
        if (!res.ok) throw new Error("Employee salary not found");
        const data = await res.json();
        setEmployeeSalary(data.employeesalary ?? data);
      } catch (error) {
        alert("Error loading data: " + error.message);
        navigate("/employeesalarys");
      }
    };
    fetchEmployeeSalary();
  }, [id, navigate]);

  const deleteEmployeeSalary = async () => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/employeesalarys/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to delete");
      alert("Deleted successfully");
      navigate("/employeesalarys");
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
  };

  if (!employeesalary) return null;

  return (
    <div style={styles.confirmContainer}>
      <p style={styles.textMuted}>Are you sure you want to delete this employee salary?</p>
      <h2 style={styles.heading}>{employeesalary.id}</h2>
      <h2 style={styles.heading}>{employeesalary.name}</h2>

      <div style={styles.btnGroup}>
        <button onClick={deleteEmployeeSalary} style={{ ...styles.btn, ...styles.btnDanger }}>
          Yes, Delete
        </button>
        <Link to="/employeesalarys" style={{ ...styles.btn, ...styles.btnBack }}>
          Cancel
        </Link>
      </div>
    </div>
  );
};

const styles = {
  confirmContainer: {
    maxWidth: 600,
    margin: "50px auto",
    padding: 30,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    marginBottom: 20,
    color: "#dc3545",
  },
  textMuted: {
    fontSize: 18,
    marginBottom: 30,
    color: "#6c757d",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "center",
    gap: 15,
  },
  btn: {
    padding: "10px 25px",
    fontSize: 16,
    borderRadius: 8,
    cursor: "pointer",
    border: "none",
    textDecoration: "none",
    display: "inline-block",
    color: "white",
  },
  btnDanger: {
    backgroundColor: "#dc3545",
  },
  btnBack: {
    backgroundColor: "#28a745",
  },
};

export default DeleteEmployeeSalary;
