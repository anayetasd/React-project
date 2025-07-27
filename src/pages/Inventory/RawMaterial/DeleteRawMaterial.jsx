import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const RawMaterialDeleteConfirm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rawMaterial, setRawMaterial] = useState(null);
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api/";
  const endpoint = `rawmaterials/${id}`;

  useEffect(() => {
    const fetchRawMaterial = async () => {
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setRawMaterial(data.rawmaterial ?? data);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };

    fetchRawMaterial();
  }, [baseUrl, endpoint]);

  const handleDelete = async (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure?")) {
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (response.ok) {
          alert("✅ RawMaterial deleted successfully!");
          navigate("/rawMaterials");
        } else {
          alert("❌ Delete failed!");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        alert("❌ Delete failed due to error!");
      }
    }
  };

  if (!rawMaterial) return <p>Loading...</p>;

  return (
    <div className="confirm-container">
      <h2>Confirm Deletion</h2>
      <p>
        Are you sure you want to delete Raw Material ID:{" "}
        <strong>{rawMaterial.id}</strong>
      </p>

      <form onSubmit={handleDelete}>
        <button className="btn-confirm" type="submit">
          Yes, Delete It
        </button>
      </form>

      <Link className="btn-back" to="/rawMaterials">
        ← Back
      </Link>

      <style>{`
        .confirm-container {
          max-width: 500px;
          margin: 50px auto;
          padding: 30px 40px;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          font-family: "Segoe UI", sans-serif;
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
    </div>
  );
};

export default RawMaterialDeleteConfirm;
