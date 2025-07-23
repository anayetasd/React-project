import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const DeleteEmployeeSalary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [employeeSalary, setEmployeeSalary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/employeesalarys/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        // Adjust this line if your data is nested differently
        setEmployeeSalary(data.data || data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = (e) => {
    e.preventDefault();

    fetch(`${baseUrl}/employeesalarys/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          navigate("/employeesalarys");
        } else {
          alert("Failed to delete.");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!employeeSalary) {
    return <p className="text-center text-danger">Salary data not found.</p>;
  }

  return (
    <div style={styles.container}>
      <p style={styles.textMuted}>Are you sure you want to delete this salary?</p>
      <h2 style={styles.danger}>ID: {employeeSalary.id || "N/A"}</h2>
      <h2>Name: {employeeSalary.name || "N/A"}</h2>
      {/* Add other fields here if you want, e.g. salary amount */}
      <form onSubmit={handleDelete}>
        <div style={styles.btnGroup}>
          <button className="btn btn-danger" type="submit">
            Yes, Delete
          </button>
          <Link className="btn btn-success" to="/employeesalarys">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  danger: {
    color: "#dc3545",
    marginBottom: "20px",
  },
  textMuted: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#6c757d",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
  },
};

export default DeleteEmployeeSalary;
