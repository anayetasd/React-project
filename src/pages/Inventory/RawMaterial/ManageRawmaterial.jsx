import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageRawMaterial = () => {
  const [rawMaterials, setRawMaterials] = useState([]);

  useEffect(() => {
    fetch("http://anayet.intelsofts.com/project_app/public/api/rawmaterials")
      .then((res) => res.json())
      .then((data) => {
        setRawMaterials(data.rawmaterials || []);
      })
      .catch((error) => {
        console.error("Failed to fetch raw materials:", error);
      });
  }, []);

  return (
    <div className="container mt-5" style={{ maxWidth: "1100px", fontFamily: "Segoe UI, sans-serif" }}>
      <div className="table-container bg-white p-4 rounded shadow">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ fontSize: "26px", color: "#333" }}>Raw Materials List</h2>
          <Link to="/raw-materials/create" className="btn btn-primary">+ New Product</Link>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead style={{ backgroundColor: "#005792", color: "#fff" }}>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Unit</th>
                <th>Price Per Unit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rawMaterials.length > 0 ? (
                rawMaterials.map((raw) => (
                  <tr key={raw.id}>
                    <td>{raw.id}</td>
                    <td>{raw.name}</td>
                    <td>{raw.unit}</td>
                    <td>{raw.price_per_unit}</td>
                    <td>
                      <div className="d-flex flex-wrap gap-2">
                        <Link to={`/raw-materials/${raw.id}`} className="btn btn-sm btn-success">View</Link>
                        <Link to={`/raw-materials/${raw.id}/edit`} className="btn btn-sm btn-info">Edit</Link>
                        <Link to={`/raw-materials/${raw.id}/confirm`} className="btn btn-sm btn-warning">Delete</Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No Raw Materials Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageRawMaterial;
