import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RawMaterialCreate = () => {
  const [form, setForm] = useState({
    name: "",
    unit: "",
    price_per_unit: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://anayet.intelsofts.com/project_app/public/api/rawmaterials",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) throw new Error("Failed to create raw material");

      const result = await response.json();
      alert("Raw Material added successfully!");
      navigate("/rawMaterials"); // Redirect after success
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save raw material.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Raw Material</h2>

      <form onSubmit={submitForm}>
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

        <input type="submit" value="Save" />
      </form>

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default RawMaterialCreate;
