import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../CSS/ManageMoney.css'

const ManageMoney = () => {
  const [mrs, setMrs] = useState([]);
  const [pagination, setPagination] = useState({});

  const fetchMRs = async (page = 1) => {
    try {
      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/mrs?page=${page}`);
      const data = await res.json();
      setMrs(data.mrs);
      setPagination({
        current: data.current_page,
        last: data.last_page
      });
    } catch (error) {
      console.error("Failed to fetch MR list", error);
    }
  };

  useEffect(() => {
    fetchMRs();
  }, []);

  const handlePageChange = (page) => {
    fetchMRs(page);
  };

  return (
    <div className="purchase-container">
      <div className="top-bar">
        <h2>Money Receipts</h2>
        <Link to="/mrs/create">+ Add New Receipt</Link>
      </div>

      <table className="purchase-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Receipt Date</th>
            <th>Shipping Address</th>
            <th>Receipt Total</th>
            <th>Paid Amount</th>
            <th>Discount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mrs.length > 0 ? (
            mrs.map((mr) => (
              <tr key={mr.id}>
                <td>{mr.id}</td>
                <td>{mr.customer?.name || "No Name"}</td>
                <td>{mr.receipt_date || "2024-06-24"}</td>
                <td>{mr.shipping_address || "Barishal"}</td>
                <td>{parseFloat(mr.receipt_total).toFixed(2)}</td>
                <td>{parseFloat(mr.paid_amount).toFixed(2)}</td>
                <td>{parseFloat(mr.discount).toFixed(2)}</td>
                <td>
                  <div className="btn-group">
                    <Link className="btn-primary" to={`/mrs/${mr.id}/edit`}>Edit</Link>
                    <Link className="btn-success" to={`/mrs/${mr.id}`}>View</Link>
                    <Link className="btn-warning" to={`/mrs/${mr.id}/confirm`}>Delete</Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No receipts found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        {[...Array(pagination.last || 1).keys()].map((i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={pagination.current === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageMoney;
