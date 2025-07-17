import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await fetch("http://anayet.intelsofts.com/project_app/public/api/customers");
      const data = await res.json();
      setCustomers(data.customers);
    } catch (error) {
      console.error("Failed to fetch customers", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="container mt-4">
      <Link to="/customers/create" className="btn btn-info mb-3 fw-bold">
        + New Customer
      </Link>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="text-white" style={{ background: "linear-gradient(to right, #0d6efd, #3b82f6)" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Address</th>
              <th>Photo</th>
              <th style={{ width: "180px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.mobile}</td>
                  <td>{customer.email}</td>
                  <td>{customer.address}</td>
                  <td>
                    {customer.photo ? (
                      <img
                        src={`http://localhost/laravel12/project_app/public/img/${customer.photo}`}
                        alt="Customer"
                        style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "50%" }}
                      />
                    ) : (
                      <span className="text-muted">No Photo</span>
                    )}
                  </td>
                  <td>
                    <div className="btn-group">
                      <Link to={`/customers/${customer.id}/edit`} className="btn btn-primary btn-sm">Edit</Link>
                      <Link to={`/customers/${customer.id}`} className="btn btn-success btn-sm">View</Link>
                      <Link to={`/customers/${customer.id}/confirm`} className="btn btn-warning btn-sm">Delete</Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted fw-bold py-4">No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCustomer;
