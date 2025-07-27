import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const DeleteCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/customers/${id}`;

  const [customer, setCustomer] = useState({});

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const res = await fetch(baseUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setCustomer(data);
        } else {
          alert("Failed to fetch customer");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Error fetching customer");
      }
    }
    fetchCustomer();
  }, [baseUrl]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await fetch(baseUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (res.ok) {
          alert("Customer deleted successfully");
          navigate("/customers");
        } else {
          alert("Delete failed!");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Delete failed due to error!");
      }
    }
  };

  return (
    <div style={styles.deleteContainer}>
      <h1 style={styles.heading}>Delete Customer</h1>
      <Link to="/customers" style={styles.backBtn}>
        ← Back
      </Link>

      <div style={styles.confirmBox}>
        <h4 style={styles.confirmHeading}>Are you sure you want to delete this customer?</h4>
        <p>
          <strong>Name:</strong> {customer.name || "..."}
        </p>
        <p>
          <strong>Mobile:</strong> {customer.mobile || "..."}
        </p>
        <p>
          <strong>Email:</strong> {customer.email || "..."}
        </p>

        <button onClick={handleDelete} style={styles.deleteBtn}>
          Delete
        </button>
      </div>
    </div>
  );
};

const styles = {
  deleteContainer: {
    maxWidth: "480px",
    margin: "50px auto",
    backgroundColor: "#fff5f5",
    border: "1px solid #f5c6cb",
    padding: "30px 40px",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(220, 53, 69, 0.3)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  heading: {
    color: "#dc3545",
    marginBottom: "20px",
  },
  backBtn: {
    display: "inline-block",
    marginBottom: "30px",
    backgroundColor: "#6c757d",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  },
  confirmBox: {},
  confirmHeading: {
    marginBottom: "25px",
    fontWeight: "600",
    color: "#a71d2a",
  },
  deleteBtn: {
    marginTop: "30px",
    backgroundColor: "#dc3545",
    border: "none",
    color: "white",
    padding: "12px 30px",
    fontSize: "16px",
    fontWeight: "700",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default DeleteCustomer;
