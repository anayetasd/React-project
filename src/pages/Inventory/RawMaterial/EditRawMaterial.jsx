import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditRawMaterial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [form, setForm] = useState({
    name: "",
    unit: "",
    price_per_unit: "",
  });

  useEffect(() => {
    fetch(`${baseUrl}/raw-materials/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name || "",
          unit: data.unit || "",
          price_per_unit: data.price_per_unit || "",
        });
      })
      .catch((err) => console.error("Error loading data:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/raw-materials/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => navigate("/rawMaterials"))
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <div>
      <Link className="btn-back" to="/rawMaterials">← Back</Link>

      <div className="form-container">
        <h2>Edit Raw Material</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="unit">Unit</label>
          <input
            type="text"
            name="unit"
            id="unit"
            value={form.unit}
            onChange={handleChange}
            required
          />

          <label htmlFor="price_per_unit">Price per Unit</label>
          <input
            type="text"
            name="price_per_unit"
            id="price_per_unit"
            value={form.price_per_unit}
            onChange={handleChange}
            required
          />

          <input type="submit" value="Update" />
        </form>
      </div>

      {/* CSS styles */}
      <style jsx="true">{`
        .form-container {
          max-width: 1000px;
          margin: 40px auto;
          background: #ffffff;
          padding: 30px 40px;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
          font-family: 'Segoe UI', sans-serif;
        }

        .form-container h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #005792;
        }

        label {
          font-weight: 600;
          display: block;
          margin-bottom: 8px;
          color: #333;
        }

        input[type="text"] {
          width: 100%;
          padding: 10px 12px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
        }

        input[type="submit"] {
          background-color: #005792;
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
        }

        input[type="submit"]:hover {
          background-color: #003f66;
        }

        .btn-back {
          display: inline-block;
          margin: 20px auto 10px 40px;
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

export default EditRawMaterial;
