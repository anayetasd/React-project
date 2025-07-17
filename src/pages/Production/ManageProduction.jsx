import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageProduction = () => {
  const [productions, setProductions] = useState([]);

  useEffect(() => {
    fetch("http://anayet.intelsofts.com/project_app/public/api/productions")
      .then((res) => res.json())
      .then((data) => {
        setProductions(data.productions); // Update this if your API returns a different structure
      })
      .catch((err) => {
        console.error("Error fetching productions:", err);
      });
  }, []);

  return (
    <div className="container mt-5 bg-white p-4 rounded shadow">
      <Link to="/productions/create" className="btn btn-info fw-bold mb-3">
        ➕ New Production
      </Link>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead
            className="text-white"
            style={{
              background: "linear-gradient(to right, rgb(18, 187, 145), #00cec9)",
            }}
          >
            <tr>
              <th>Production Date</th>
              <th>Product Name</th>
              <th>Raw Material Used</th>
              <th>Raw Material Qty</th>
              <th>Unit</th>
              <th>Total Produced</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productions.length > 0 ? (
              productions.map((production) => (
                <tr key={production.id}>
                  <td>{production.production_date}</td>
                  <td>{production.product?.name ?? "no name"}</td>
                  <td>{production.rawMAterial?.name ?? "no name"}</td>
                  <td>{production.rawMAterial?.unit ?? "no unit"}</td>
                  <td>{production.unit}</td>
                  <td>{production.quantity_produced}</td>
                  <td>
                    <div className="btn-group">
                      <Link
                        to={`/productions/${production.id}/edit`}
                        className="btn btn-sm btn-primary"
                      >
                        ✏️ Edit
                      </Link>
                      <Link
                        to={`/productions/${production.id}`}
                        className="btn btn-sm btn-success"
                      >
                        🔍 View
                      </Link>
                      <Link
                        to={`/productions/${production.id}/confirm`}
                        className="btn btn-sm btn-warning"
                      >
                        🗑️ Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center bg-warning text-dark fw-semibold py-3">
                  🚫 No Production Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduction;
