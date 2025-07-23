import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageStock = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch("http://anayet.intelsofts.com/project_app/public/api/stocks")
      .then((res) => res.json())
      .then((data) => {
        setStocks(data.stocks); // Update according to your API structure
      })
      .catch((err) => {
        console.error("Error fetching stock data:", err);
      });
  }, []);

  return (
    <div className="container mt-5 bg-white p-4 rounded shadow">
      <Link to="/stocks/create" className="btn btn-info fw-bold mb-3">
        ➕ New Stock
      </Link>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead
            className="text-white"
            style={{
              background: "linear-gradient(to right, rgb(22, 163, 76), #a29bfe)",
            }}
          >
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Transaction Type</th>
              <th>Created At</th>
              <th>Warehouse</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length > 0 ? (
              stocks.map((stock) => (
                <tr key={stock.id}>
                  <td>{stock.id}</td>
                  <td>{stock.product?.name ?? "no name"}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.transaction_type?.name ?? "no name"}</td>
                  <td>{new Date(stock.created_at).toLocaleString()}</td>
                  <td>{stock.warehouse?.name ?? "no name"}</td>
                  <td>
                    <div className="btn-group">
                      <Link to={`/stocks/${stock.id}/edit`} className="btn btn-sm btn-primary" > Edit </Link>
                      <Link to={`/stocks/${stock.id}`} className="btn btn-sm btn-success" >  View </Link>
                      <Link to={`/stocks/${stock.id}/confirm`} className="btn btn-sm btn-danger"> Delete</Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center bg-warning text-dark fw-semibold py-3">
                  🚫 No stock found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStock;
