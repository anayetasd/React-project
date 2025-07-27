import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const StockShow = () => {
  const { id } = useParams();
  const [stock, setStock] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/stocks/${id}`);
        const data = await res.json();
        setStock(data.stock || data); // support both {stock: {...}} or direct object
      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    };

    fetchStock();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateStr).toLocaleString("en-US", options);
  };

  if (!stock) {
    return <p>Loading stock details...</p>;
  }

  return (
    <>
      <div className="show-container">
        <Link className="btn btn-success btn-back" to="/stocks">← Back</Link>

        <h3>Stock Details</h3>

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

      <style>{`
        .show-container {
          max-width: 900px;
          margin: 40px auto;
          background: #ffffff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
        }
        .show-container h3 {
          margin-bottom: 25px;
          font-weight: 600;
          text-align: center;
          color: #333;
        }
        .table th, .table td {
          vertical-align: middle;
          padding: 12px 15px;
        }
        .btn-back {
          margin-bottom: 20px;
          display: inline-block;
          text-decoration: none;
          color: white;
          background-color: #198754; /* bootstrap success */
          padding: 6px 12px;
          border-radius: 6px;
          font-weight: 600;
        }
        .btn-back:hover {
          background-color: #157347;
        }
      `}</style>
    </>
  );
};

export default StockShow;
