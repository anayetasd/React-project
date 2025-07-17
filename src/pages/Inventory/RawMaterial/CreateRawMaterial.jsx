import React, { useState } from "react";


const CreateRawMaterial = () => {
  const [formData, setFormData] = useState({
    name: "",
    unit: "",
    price_per_unit: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://anayet.intelsofts.com/project_app/public/api/raw-materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Raw Material created successfully");
        setFormData({ name: "", unit: "", price_per_unit: "" });
      } else {
        const err = await response.json();
        alert("❌ Failed: " + (err.message || "Unknown error"));
      }
    } catch (error) {
      alert("⚠️ Error: " + error.message);
    }
  };

  return (
    <div className="form-container" style={formStyle.container}>
      <h2 style={formStyle.title}>Add New Raw Material</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" style={formStyle.label}>Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={formStyle.input}
        />

        <label htmlFor="unit" style={formStyle.label}>Unit</label>
        <input
          type="text"
          name="unit"
          id="unit"
          value={formData.unit}
          onChange={handleChange}
          required
          style={formStyle.input}
        />

        <label htmlFor="price_per_unit" style={formStyle.label}>Price per Unit</label>
        <input
          type="text"
          name="price_per_unit"
          id="price_per_unit"
          value={formData.price_per_unit}
          onChange={handleChange}
          required
          style={formStyle.input}
        />

        <input type="submit" value="💾 Save" style={formStyle.submitBtn} />
      </form>
    </div>
  );
};

export default CreateRawMaterial;

// 👉 Inline styling like your Laravel Blade version
const formStyle = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    background: "#ffffff",
    padding: "30px 40px",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0,0,0,0.08)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#005792",
  },
  label: {
    fontWeight: "600",
    display: "block",
    marginBottom: "8px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
  },
  submitBtn: {
    backgroundColor: "#005792",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
};
