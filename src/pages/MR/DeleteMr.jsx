import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const DeleteMoneyReceipt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mr, setMr] = useState(null);

  useEffect(() => {
    const fetchMr = async () => {
      try {
        const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/mrs/${id}`);
        const data = await res.json();
        setMr(data.mr ?? data);
      } catch (err) {
        console.error('Failed to load MR:', err);
      }
    };

    fetchMr();
  }, [id]);

  const deleteReceipt = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/mrs/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      });

      if (res.ok) {
        alert('Money Receipt deleted successfully!');
        navigate('/mrs');
      } else {
        alert('Delete failed.');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <>
      <style>{`
        .confirm-container {
          max-width: 500px;
          margin: 50px auto;
          padding: 30px;
          background-color: #fff3f3;
          border: 1px solid #f5c6cb;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .confirm-container h2 {
          color: #dc3545;
          margin-bottom: 20px;
        }
        .confirm-container p {
          font-size: 18px;
          margin-bottom: 30px;
        }
        .btn-danger {
          padding: 10px 20px;
          font-weight: bold;
          border-radius: 8px;
          border: none;
          background-color: #dc3545;
          color: white;
          cursor: pointer;
        }
        .btn-danger:hover {
          background-color: #c82333;
        }
        .btn-back {
          margin-top: 20px;
          display: inline-block;
          background-color: #6c757d;
          color: white;
          padding: 8px 14px;
          border-radius: 6px;
          text-decoration: none;
        }
        .btn-back:hover {
          background-color: #5a6268;
        }
      `}</style>

      {mr && (
        <div className="confirm-container">
          <h2>Delete Money Receipt #{mr.id}</h2>
          <p>Are you sure you want to delete this Money Receipt?</p>

          <form onSubmit={deleteReceipt}>
            <input className="btn-danger" type="submit" value="Yes, Confirm Delete" />
          </form>

          <Link className="btn-back" to="/mrs">← Cancel</Link>
        </div>
      )}
    </>
  );
};

export default DeleteMoneyReceipt;
