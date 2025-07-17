import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageFinishedGood = () => {
  const [finishedGoods, setFinishedGoods] = useState([]);

  useEffect(() => {
    fetch("http://anayet.intelsofts.com/project_app/public/api/finishedgoods")
      .then((res) => res.json())
      .then((data) => {
        setFinishedGoods(data.finishedgoods || []);
      })
      .catch((error) => {
        console.error("Error fetching finished goods:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="bg-white p-4 rounded shadow">
        <div className="d-flex justify-content-end mb-3">
          <Link to="/finishedGoods/create" className="btn btn-info fw-bold">
            + New Finished Goods
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="text-white" style={{ backgroundColor: "#0d6efd" }}>
              <tr className="text-center">
                <th>ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {finishedGoods.length > 0 ? (
                finishedGoods.map((item) => (
                  <tr className="text-center" key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.order_date}</td>
                    <td>{item.finished_good_status}</td>
                    <td>
                      <div className="btn-group">
                        <Link
                          to={`/finishedGoods/${item.id}/edit`}
                          className="btn btn-sm btn-primary"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/finishedGoods/${item.id}`}
                          className="btn btn-sm btn-success"
                        >
                          View
                        </Link>
                        <Link
                          to={`/finishedGoods/${item.id}/confirm`}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted fw-semibold py-3">
                    🚫 No Finished Goods Found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageFinishedGood;
