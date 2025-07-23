import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const DeleteSale = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState(null);
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  // Fetch the sale data
  useEffect(() => {
    fetch(`${baseUrl}/sales/${id}`)
      .then((res) => res.json())
      .then((data) => setSale(data))
      .catch((err) => console.error("Failed to fetch sale:", err));
  }, [id]);

  // Handle delete action
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${baseUrl}/sales/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/sales");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="container delete-sale-container">
      <style>{`
        .delete-sale-container {
          max-width: 600px;
          margin: 50px auto;
          padding: 40px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0,0,0,0.1);
          text-align: center;
        }
        .btn {
          padding: 10px 20px;
          font-weight: bold;
          border-radius: 8px;
          margin: 10px;
        }
        .btn-danger {
          background-color: #dc3545;
          color: white;
          border: none;
        }
        .btn-success {
          background-color: #28a745;
          color: white;
          border: none;
        }
        h2 {
          font-size: 28px;
          margin-top: 30px;
        }
      `}</style>

      <Link to="/sales" className="btn btn-success">Back</Link>

      <p>Are you sure?</p>

      {sale ? (
        <h2>Sale ID: {sale.id}</h2>
      ) : (
        <p className="text-muted">Loading sale data...</p>
      )}

      <form onSubmit={handleDelete}>
        <input className="btn btn-danger" type="submit" value="Confirm Delete" />
      </form>
    </div>
  );
};

export default DeleteSale;
