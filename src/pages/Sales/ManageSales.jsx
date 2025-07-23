import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  useEffect(() => {
    fetch(`${baseUrl}/sales`)
      .then((res) => res.json())
      .then((data) => setSales(data.sales))
      .catch((err) => console.error("Failed to fetch sales:", err));
  }, []);

  return (
    <div className="container table-container">
      <style>{`
        body {
          background-color: #f0f2f5;
        }
        .table-container {
          margin-top: 50px;
          padding: 40px;
          background-color: #ffffff;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        thead th {
          background: linear-gradient(to right, #0d6efd, #3b82f6);
          color: white;
          text-align: center;
          border: none;
          font-size: 16px;
          padding: 15px;
        }
        tbody tr:nth-child(odd) {
          background-color: #f8f9fc;
        }
        tbody tr:nth-child(even) {
          background-color: #ffffff;
        }
        tbody tr:hover {
          background-color: #e2e6ea;
          transition: 0.3s;
        }
        .btn-group .btn {
          margin-right: 6px;
          border-radius: 8px;
          transition: 0.3s;
        }
        .btn-group .btn:hover {
          transform: scale(1.05);
        }
        .top-btn {
          margin-bottom: 25px;
          font-weight: bold;
          padding: 12px 20px;
          border-radius: 8px;
        }
        .badge {
          padding: 6px 10px;
          font-size: 13px;
          border-radius: 12px;
        }
        .table td, .table th {
          vertical-align: middle;
        }
      `}</style>

      <Link to="/sales/create" className="btn btn-info top-btn"><i className="fas fa-plus-circle"></i> New Sales</Link>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Total Amount</th>
              <th>Discount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {sales.length > 0 ? (
              sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.customer?.name || "No Customer"}</td>
                  <td>{parseFloat(sale.total_amount).toFixed(2)}</td>
                  <td>{parseFloat(sale.discount).toFixed(2)}</td>
                  <td>
                    <span className={`badge ${sale.status === "confirmed" ? "bg-secondary text-white" : "bg-white text-dark"}`}>
                      {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link to={`/sales/${sale.id}/edit`} className="btn btn-sm btn-primary">Edit</Link>
                      <Link to={`/sales/${sale.id}`} className="btn btn-sm btn-success">View</Link>
                      <Link to={`/sales/${sale.id}/confirm`} className="btn btn-sm btn-danger">Delete</Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-muted">No Sales Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesList;
