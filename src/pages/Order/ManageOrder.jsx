import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://anayet.intelsofts.com/project_app/public/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .catch((err) => console.error("Order fetch error:", err));
  }, []);

  return (
    <div className="container mt-5 p-4 bg-white rounded shadow">
      <Link to="/orders/create" className="btn btn-info mb-3 fw-bold">
        <i className="fas fa-plus-circle"></i> New Order
      </Link>

      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead style={{ background: "linear-gradient(90deg, #0d6efd, #3b82f6)", color: "#fff" }}>
            <tr>
              <th>Id</th>
              <th>Customer Id</th>
              <th>Address</th>
              <th>Remark</th>
              <th>Discount</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer?.name || order.customer_id}</td>
                  <td>{order.shipping_address}</td>
                  <td>{order.remark}</td>
                  <td>{order.discount}</td>
                  <td>{order.paid_amount}</td>
                  <td>
                    <div className="btn-group">
                      <Link to={`/orders/${order.id}/edit`} className="btn btn-sm btn-primary">Edit</Link>
                      <Link to={`/orders/${order.id}`} className="btn btn-sm btn-success">View</Link>
                      <Link to={`/orders/${order.id}/confirm`} className="btn btn-sm btn-warning">Delete</Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-muted text-center py-3">No Orders Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrder;
