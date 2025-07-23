import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchEmployees(`${baseUrl}/employees`);
  }, []);

  const fetchEmployees = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setEmployees(data.employees || []);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
      });
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handlePageChange = (url) => {
    if (url) fetchEmployees(url);
  };

  return (
    <>
      <style>{`
        .container {
          max-width: 1200px;
          margin: 40px auto;
          font-family: 'Segoe UI', sans-serif;
        }

        .table-container {
          background: #ffffff;
          padding: 30px;
          border-radius: 14px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        }

        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .header-section h2 {
          margin: 0;
          font-size: 28px;
          color: #2c3e50;
        }

        .btn {
          padding: 8px 14px;
          text-decoration: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          margin-right: 6px;
          transition: all 0.25s ease;
          display: inline-block;
        }

        .btn-primary { background-color: #2980b9; color: #fff; }
        .btn-success { background-color: #27ae60; color: #fff; }
        .btn-info    { background-color: #16a085; color: #fff; }
        .btn-warning { background-color: #f39c12; color: #fff; }
        .btn:hover {
          opacity: 0.92;
          transform: translateY(-1px);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
          border: 1px solid #ccc;
        }

        thead tr {
          background-color:rgb(16, 119, 64);
          color: #ffffff;
        }

        th, td {
          padding: 14px 16px;
          text-align: left;
          vertical-align: middle;
          border: 1px solid #ddd;
        }

        tbody tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        tbody tr:hover {
          background-color: #ecf0f1;
        }

        td img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 50%;
          border: 2px solid #ddd;
        }

        .text-center {
          text-align: center;
        }

        .text-muted {
          color: #999;
        }

        .pagination {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .pagination button {
          padding: 8px 14px;
          border: none;
          background: #0d6efd;
          color: white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .pagination button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      `}</style>

      <div className="table-container">
        <div className="header-section">
          <h2>Employee List</h2>
          <Link className="btn btn-primary" to="/employees/create">+ New Employee</Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Shift</th>
              <th>Category</th>
              <th>Joining Date</th>
              <th>Photo</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.shift?.name || "N/A"}</td>
                  <td>{employee.categorie?.name || "N/A"}</td>
                  <td>{employee.joining_date}</td>
                  <td>
                    {employee.photo ? (
                      <img
                        src={`http://anayet.intelsofts.com/project_app/public/uploads/employees/${employee.photo}`}
                        alt="photo"
                      />
                    ) : (
                      <span className="text-muted">No Photo</span>
                    )}
                  </td>
                  <td>{employee.phone_number || "N/A"}</td>
                  <td>{employee.address || "N/A"}</td>
                  <td>
                    <Link className="btn btn-success" to={`/employees/${employee.id}`}>View</Link>
                    <Link className="btn btn-info" to={`/employees/${employee.id}/edit`}>Edit</Link>
                    <Link className="btn btn-warning" to={`/employees/${employee.id}/confirm`}>Delete</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">No Employee Found</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            disabled={!pagination.prev_page_url}
            onClick={() => handlePageChange(pagination.prev_page_url)}
          >
            ← Prev
          </button>
          <button
            disabled={!pagination.next_page_url}
            onClick={() => handlePageChange(pagination.next_page_url)}
          >
            Next →
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployeeList;
