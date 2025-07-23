import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const DeletePurchase = () => {
  const { id } = useParams();
  const [purchase, setPurchase] = useState(null);
  const navigate = useNavigate();

  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  useEffect(() => {
    fetch(`${baseUrl}/purchases/${id}`)
      .then(res => res.json())
      .then(data => setPurchase(data))
      .catch(err => console.error("Error fetching purchase:", err));
  }, [id]);

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/purchases/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          alert("✅ Purchase deleted successfully.");
          navigate("/purchases");
        } else {
          return res.json().then(err => {
            throw new Error(err.message || "❌ Failed to delete.");
          });
        }
      })
      .catch(err => alert(err.message));
  };

  if (!purchase) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow border-danger">
        <div className="card-header bg-danger text-white">
          <h4>Confirm Deletion</h4>
        </div>
        <div className="card-body">
          <p className="text-danger fw-bold">Are you sure you want to delete the following purchase?</p>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Purchase ID</th>
                <td>{purchase.id}</td>
              </tr>
              <tr>
                <th>Purchase Date</th>
                <td>{new Date(purchase.purchase_date).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th>Supplier</th>
                <td>{purchase.supplier?.name || 'N/A'}</td>
              </tr>
              <tr>
                <th>Discount</th>
                <td>৳{parseFloat(purchase.discount).toFixed(2)}</td>
              </tr>
              <tr>
                <th>Paid Amount</th>
                <td>৳{parseFloat(purchase.paid_amount).toFixed(2)}</td>
              </tr>
              <tr>
                <th>Total Products</th>
                <td>{purchase.details?.length || 0}</td>
              </tr>
            </tbody>
          </table>

          <form onSubmit={handleDelete} className="d-inline">
            <button type="submit" className="btn btn-danger me-2">Yes, Delete</button>
          </form>
          <Link to="/purchases" className="btn btn-secondary">Cancel</Link>
        </div>
      </div>
    </div>
  );
};

export default DeletePurchase;
