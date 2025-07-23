import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const DeleteOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/orders/${id}`)
      .then(res => res.json())
      .then(data => setOrder(data))
      .catch(err => console.error("Fetch error:", err));
  }, [id]);

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/orders/${id}`, {
      method: "DELETE",
    })
      .then(res => {
        if (res.ok) {
          navigate("/orders");
        } else {
          alert("Failed to delete order.");
        }
      })
      .catch(err => console.error("Delete error:", err));
  };

  return (
    <div style={styles.container}>
      <Link to="/orders" className="btn btn-success" style={styles.backBtn}>
        Back
      </Link>

      <p style={{ fontSize: "18px" }}>Are you sure?</p>
      <h2 style={styles.customerId}>
        {order ? `Customer ID: ${order.customer_id}` : "Loading..."}
      </h2>

      <form onSubmit={handleDelete}>
        <input
          type="submit"
          className="btn btn-danger"
          style={styles.confirmBtn}
          value="Confirm"
        />
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "60px auto",
    padding: "30px 40px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  customerId: {
    margin: "30px 0",
    color: "#005792",
  },
  backBtn: {
    marginBottom: "20px",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: 600,
    textDecoration: "none",
    backgroundColor: "#198754",
    color: "white",
    transition: "background-color 0.3s ease",
  },
  confirmBtn: {
    padding: "12px 25px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "#dc3545",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default DeleteOrder;
