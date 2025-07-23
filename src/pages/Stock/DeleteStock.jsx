import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const DeleteStock = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    product_id: "",
    qty: "",
    transaction_type_id: "",
    warehouse_id: "",
    created_at: "",
  });

  const [productName, setProductName] = useState("");
  const [warehouseName, setWarehouseName] = useState("");

  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const stockRes = await fetch(`${baseUrl}/stocks/${id}`);
        const stockData = await stockRes.json();

        if (!stockRes.ok) {
          throw new Error("Failed to fetch stock");
        }

        const stock = stockData.data ?? stockData;

        setForm({
          product_id: stock.product_id || "",
          qty: stock.qty || "",
          transaction_type_id: stock.transaction_type_id || "",
          warehouse_id: stock.warehouse_id || "",
          created_at: formatDatetimeLocal(stock.created_at),
        });

        setProductName(stock.product?.name || "N/A");
        setWarehouseName(stock.warehouse?.name || "N/A");

      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    };

    fetchStock();
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseUrl}/stocks/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        navigate("/stocks");
      } else {
        const errorData = await res.json();
        console.error("Delete failed:", errorData);
      }
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  const formatDatetimeLocal = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="confirm-container" style={styles.container}>
      <Link to="/stocks" className="btn btn-success btn-back" style={styles.backButton}>
        ← Back
      </Link>

      <h3 style={styles.heading}>Are you sure you want to delete this stock?</h3>

      <div className="confirm-details" style={styles.details}>
        <p><strong>ID:</strong> {id}</p>
        <p><strong>Product:</strong> {productName}</p>
        <p><strong>Qty:</strong> {form.qty}</p>
        <p><strong>Warehouse:</strong> {warehouseName}</p>
      </div>

      <form onSubmit={handleDelete}>
        <input type="submit" className="btn btn-danger" value="Yes, Delete" style={styles.deleteButton} />
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: {
    marginBottom: "25px",
    fontWeight: "700",
    color: "#dc3545",
  },
  details: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "25px",
    textAlign: "left",
    fontSize: "1.1rem",
    color: "#333",
    boxShadow: "inset 0 0 10px #e9ecef",
  },
  backButton: {
    display: "inline-block",
    marginBottom: "20px",
  },
  deleteButton: {
    width: "100%",
    fontWeight: "600",
    padding: "10px 0",
    fontSize: "1.1rem",
    borderRadius: "8px",
    transition: "background-color 0.3s ease",
  },
};

export default DeleteStock;
