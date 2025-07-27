import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EmployeeDeleteConfirm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetch(`http://anayet.intelsofts.com/project_app/public/api/employees/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load employee');
        return res.json();
      })
      .then((data) => {
        setEmployee(data.employee ?? data);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to fetch employee data.');
      });
  }, [id]);

  const deleteEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/employees/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to delete employee');
      alert('Employee deleted successfully');
      navigate('/employees');
    } catch (err) {
      console.error(err);
      alert('Failed to delete employee.');
    }
  };

  return (
    <>
      {employee && (
        <div className="confirm-container">
          <h2>Confirm Deletion</h2>
          <p>
            Are you sure you want to delete Raw Material ID: <strong>{employee.id}</strong>?
          </p>
          <h4>Employee Name: {employee.name}</h4>
          <h4>Address: {employee.address}</h4>

          <form onSubmit={deleteEmployee}>
            <input className="btn-confirm" type="submit" value="Yes, Delete It" />
          </form>

          <Link to="/employees" className="btn-back">← Back</Link>
        </div>
      )}

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
    </>
  );
};

export default EmployeeDeleteConfirm;
