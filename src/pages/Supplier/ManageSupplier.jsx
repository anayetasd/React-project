import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch("http://anayet.intelsofts.com/project_app/public/api/suppliers")
      .then((response) => response.json())
      .then((data) => {
        setSuppliers(data.suppliers); 
      })
      .catch((error) => {
        console.error("Error fetching supplier data:", error);
      });
  }, []);

  return (
    <div className="container mt-5 bg-white p-4 rounded shadow">
      <Link to="/suppliers/create" className="btn btn-info fw-bold mb-3">
        ➕ New Supplier
      </Link>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="text-white" style={{ background: "linear-gradient(to right, #0d6efd, #3b82f6)" }}>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.id}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.mobile}</td>
                  <td>{supplier.email}</td>
                  <td>
                    <img
                      src={`/img/${supplier.photo}`}
                      alt="Supplier"
                      className="img-thumbnail"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "2px solid #ccc",
                      }}
                    />
                  </td>
                  <td>
                    <div className="btn-group">
                      <Link to={`/suppliers/${supplier.id}/edit`} className="btn btn-sm btn-primary">
                         Edit
                      </Link>
                      <Link to={`/suppliers/${supplier.id}`} className="btn btn-sm btn-success">
                         View
                      </Link>
                      <Link to={`/suppliers/${supplier.id}/confirm`} className="btn btn-sm btn-danger">
                         Delete
                      </Link>
                     
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center bg-warning text-dark fw-semibold py-3">
                  🚫 No supplier found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSupplier;
