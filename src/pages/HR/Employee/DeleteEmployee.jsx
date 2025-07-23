import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const DeleteEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/employees/${id}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data))
      .catch((err) => console.error("Error fetching employee:", err));
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) return;

    try {
      const response = await fetch(`${baseUrl}/employees/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert("Employee deleted successfully.");
        navigate("/employees");
      } else {
        alert("Failed to delete employee.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Error occurred during deletion.");
    }
  };

  return (
    <div className="confirm-container">
      <style>{`
        .confirm-container {
          max-width: 500px;
          margin: 50px auto;
          padding: 30px 40px;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', sans-serif;
          text-align: center;
        }

        .confirm-container h2 {
          margin-bottom: 20px;
          color: #b30000;
        }

        .confirm-container p {
          font-size: 18px;
          margin-bottom: 30px;
          color: #333;
        }

        .btn-confirm {
          background-color: #dc3545;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .btn-confirm:hover {
          background-color: #c82333;
        }

        .btn-back {
          display: inline-block;
          margin-top: 15px;
          text-decoration: none;
          background-color: #28a745;
          color: white;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 15px;
        }

        .btn-back:hover {
          background-color: #218838;
        }
      `}</style>

      <h2>Confirm Deletion</h2>
      {employee ? (
        <>
          <p>
            Are you sure you want to delete Employee ID:{" "}
            <strong>{employee.id}</strong>?
          </p>
          <h4>Employee Name: {employee.name}</h4>
          <h4>Address: {employee.address}</h4>

          <form onSubmit={handleDelete}>
            <input className="btn-confirm" type="submit" value="Yes, Delete It" />
          </form>

          <Link className="btn-back" to="/employees">
            ← Back
          </Link>
        </>
      ) : (
        <p>Loading employee details...</p>
      )}
    </div>
  );
};

export default DeleteEmployee;
