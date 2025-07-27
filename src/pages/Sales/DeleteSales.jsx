import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SaleDeleteConfirm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState({ id: "" });

  useEffect(() => {
    fetchSale();
  }, []);

  const fetchSale = async () => {
    try {
      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/sales/${id}`);
      if (!res.ok) throw new Error("Failed to fetch sale data");

      const data = await res.json();
      console.log("Sale API Response:", data);
      setSale(data.sale ?? data);
    } catch (err) {
      alert(err.message);
      navigate("/sales");
    }
  };

  const goBack = () => {
    navigate("/sales");
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this sale?")) return;

    try {
      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/sales/${sale.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete sale");
      }

      alert("Sale deleted successfully!");
      navigate("/sales");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={goBack} style={styles.successBtn} className="mb-3">Back</button>
      <p>Are you sure?</p>
      <h2 style={styles.idBox}>{sale.id}</h2>
      

      <form onSubmit={handleDelete} style={{ padding: "20px" }}>
        <input type="submit" value="Confirm" style={styles.dangerBtn} />
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "20px",
    margin: "40px auto",
    textAlign: "center",
  },
  successBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  dangerBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "10px 25px",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  idBox: {
    padding: "16px",
    fontSize: "24px",
    fontWeight: "bold",
  },
};

export default SaleDeleteConfirm;
