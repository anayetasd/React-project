import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const RawMaterialEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    unit: "",
    price_per_unit: "",
  });

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await fetch(
          `http://anayet.intelsofts.com/project_app/public/api/rawmaterials/${id}`
        );
        if (!response.ok) throw new Error("Failed to load raw material");
        const data = await response.json();

        const rm = data.rawmaterial ?? data;

        setForm({
          name: rm.name || "",
          unit: rm.unit || "",
          price_per_unit: rm.price_per_unit || "",
        });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchMaterial();
  }, [id]);

  const updateMaterial = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://anayet.intelsofts.com/project_app/public/api/rawmaterials/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) throw new Error("Update failed");

      alert("Raw material updated successfully!");
      navigate("/rawMaterials");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update raw material.");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div>
      <Link className="btn-back" to="/rawMaterials">
        ← Back
      </Link>

      <div className="form-container">
        <h2>Edit Raw Material</h2>

        <form onSubmit={updateMaterial}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
          />

          <label htmlFor="unit">Unit</label>
          <input
            id="unit"
            type="text"
            required
            value={form.unit}
            onChange={handleChange}
          />

          <label htmlFor="price_per_unit">Price per Unit</label>
          <input
            id="price_per_unit"
            type="text"
            required
            value={form.price_per_unit}
            onChange={handleChange}
          />

          <input type="submit" value="Update" />
        </form>
      </div>

      <style>{`
        .form-container {
          max-width: 1000px;
          margin: 40px auto;
          background: #ffffff;
          padding: 30px 40px;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
          font-family: "Segoe UI", sans-serif;
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

export default RawMaterialEdit;
