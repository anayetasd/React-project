import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmployeeSalaryList = () => {
  const [employeeSalaries, setEmployeeSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

 useEffect(() => {
  fetch(`${baseUrl}/employeesalarys`)
    .then((res) => res.json())
    .then((data) => {
      console.log("API Response:", data.employeesalarys); 
      setEmployeeSalaries(data.employeesalarys);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setLoading(false);
    });
}, []);

  return (
    <div className="container mt-5 p-4" style={{
      backgroundColor: "#ffffff",
      borderRadius: "15px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      maxWidth: "1200px"
    }}>
      <Link to="/employeesalarys/create" className="btn btn-info mb-2 fw-bold fs-1 px-2 py-2">
        ➕ New Employee Salary
      </Link>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr style={{ background: "linear-gradient(to right, #0d6efd, #3b82f6)", color: "#fff", textAlign: "center" }}>
              <th>Id</th>
              <th>Name</th>
              <th>Payment Date</th>
              <th>Administrator</th>
              <th>Payment Method</th>
              <th>Total Amount</th>
              <th>Paid Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-3">Loading...</td>
              </tr>
            ) : employeeSalaries.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data text-center fs-5 fw-medium py-4" style={{ backgroundColor: "#fff3cd", color: "#856404" }}>
                  No Employee Salary found.
                </td>
              </tr>
            ) : (
              employeeSalaries.map((salary) => (
                <tr key={salary.id}>
                  <td>{salary.id}</td>
                  <td>{salary.name}</td>
                  <td>{salary.payment_date}</td>
                  <td>{ salary.administrator?.name || 'N/A' }</td>
                  <td>{salary.payment?.name ?? "N/A"}</td>
                  <td>{salary.total_amount}</td>
                  <td>{salary.paid_amount}</td>
                  <td>
                    <div className="btn-group">
                      <Link to={`/employeesalarys/${salary.id}/edit`} className="btn btn-sm btn-primary me-1">Edit</Link>
                      <Link to={`/employeesalarys/${salary.id}`} className="btn btn-sm btn-success me-1">View</Link>
                      <Link to={`/employeesalarys/${salary.id}/confirm`} className="btn btn-sm btn-danger">Delete</Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeSalaryList;
