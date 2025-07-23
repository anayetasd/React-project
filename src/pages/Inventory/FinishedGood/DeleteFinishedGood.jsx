import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const DeleteFinishedGood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [finishedGood, setFinishedGood] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch finished good data to display product name
  useEffect(() => {
    fetch(`${baseUrl}/finishedgoods/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch finished good");
        return res.json();
      })
      .then((data) => {
        setFinishedGood(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = (e) => {
    e.preventDefault();

    fetch(`${baseUrl}/finishedgoods/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        alert("Finished Good deleted successfully!");
        navigate("/finishedGoods");
      })
      .catch((error) => {
        console.error("Delete error:", error);
        alert("Failed to delete finished good.");
      });
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  if (!finishedGood)
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        Finished Good not found.
      </p>
    );

  return (
    <div style={styles.confirmContainer}>
      <h2>Delete FinishedGoods: {finishedGood.product_name}</h2>
      <p>Are you sure you want to delete this finished good?</p>

      <form onSubmit={handleDelete}>
        <input
          type="submit"
          value="Yes, Confirm Delete"
          style={styles.btnDanger}
        />
      </form>

      <Link to="/finishedgoods" style={styles.btnBack}>
        ← Cancel
      </Link>
    </div>
  );
};

const styles = {
  confirmContainer: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#fff3f3",
    border: "1px solid #f5c6cb",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  btnDanger: {
    padding: "10px 20px",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#dc3545",
    color: "white",
    cursor: "pointer",
  },
  btnBack: {
    marginTop: "20px",
    display: "inline-block",
    backgroundColor: "#6c757d",
    color: "white",
    padding: "8px 14px",
    borderRadius: "6px",
    textDecoration: "none",
    transition: "background-color 0.3s",
  },
};

export default DeleteFinishedGood;
