import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const StockDetails = () => {
  const { id } = useParams();
  const [stock, setStock] = useState(null);
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  useEffect(() => {
    fetch(`${baseUrl}/stocks/${id}`)
      .then((res) => res.json())
      .then((data) => setStock(data))
      .catch((err) => console.error("Failed to fetch stock:", err));
  }, [id]);

  if (!stock) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div style={styles.container}>
      <Link to="/stocks" className="btn btn-success" style={styles.backBtn}>
        ← Back
      </Link>

      <h3 style={styles.heading}>Stock Details</h3>

      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{stock.id}</td>
          </tr>
          <tr>
            <th>Product Name</th>
            <td>{stock.product?.name || "no name"}</td>
          </tr>
          <tr>
            <th>Quantity</th>
            <td>{stock.qty}</td>
          </tr>
          <tr>
            <th>Transaction Type</th>
            <td>{stock.transaction_type?.name || "no name"}</td>
          </tr>
          <tr>
            <th>Warehouse</th>
            <td>{stock.warehouse?.name || "no name"}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>{formatDate(stock.created_at)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.05)",
  },
  heading: {
    marginBottom: "25px",
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  backBtn: {
    marginBottom: "20px",
    display: "inline-block",
  },
};

export default StockDetails;
