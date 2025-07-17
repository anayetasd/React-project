import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ManagePurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://anayet.intelsofts.com/project_app/public/api/purchases")
      .then((res) => res.json())
      .then((data) => {
        setPurchases(data.purchases || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching purchases:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container purchase-container">
      <div className="top-bar">
        <Link className="btn btn-info" to="/purchases/create">
          + Add New Purchase
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table purchase-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Supplier</th>
              <th>Purchase Date</th>
              <th>Shipping Address</th>
              <th>Purchase Total</th>
              <th>Paid Amount</th>
              <th>Discount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchases.length > 0 ? (
              purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td>{purchase.id}</td>
                  <td>{purchase.supplier?.name || "no name"}</td>
                  <td>{purchase.purchase_date}</td>
                  <td>{purchase.shipping_address}</td>
                  <td>{purchase.purchase_total}</td>
                  <td>{purchase.paid_amount}</td>
                  <td>{purchase.discount}</td>
                  <td>
                    <div className="btn-group">
                      <Link className="btn btn-primary" to={`/purchases/${purchase.id}/edit`}>
                        Edit
                      </Link>
                      <Link className="btn btn-success" to={`/purchases/${purchase.id}`}>
                        View
                      </Link>
                      <Link className="btn btn-warning" to={`/purchases/${purchase.id}/confirm`}>
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No purchases found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManagePurchases;
