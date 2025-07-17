import React, { useState } from "react";


const CreateProduction = () => {
  const [formData, setFormData] = useState({
    production_date: "",
    product_id: "",
    raw_material_id: "",
    raw_material_qty: "",
    unit: "",
    quantity_produced: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productionData = new FormData();
    productionData.append("production_date", formData.production_date);
    productionData.append("product_id", formData.product_id);
    productionData.append("raw_material_id", formData.raw_material_id);
    productionData.append("raw_material_qty", formData.raw_material_qty);
    productionData.append("unit", formData.unit);
    productionData.append("quantity_produced", formData.quantity_produced);

    try {
      const response = await fetch("http://anayet.intelsofts.com/project_app/public/api/productions", {
        method: "POST",
        body: productionData,
      });

      if (response.ok) {
        alert("✅ Production created successfully!");
        setFormData({
          production_date: "",
          product_id: "",
          raw_material_id: "",
          raw_material_qty: "",
          unit: "",
          quantity_produced: "",
        });
      } else {
        const error = await response.json();
        alert("❌ Failed: " + (error.message || "Unknown error"));
      }
    } catch (error) {
      alert("❌ Error: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Production</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="production_date">Production Date</label>
          <input
            type="text"
            name="production_date"
            id="production_date"
            value={formData.production_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="product_id">Product Name (ID)</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            value={formData.product_id}
            onChange={handleChange}
            placeholder="Enter Product ID"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="raw_material_id">Raw Material Used (ID)</label>
          <input
            type="text"
            name="raw_material_id"
            id="raw_material_id"
            value={formData.raw_material_id}
            onChange={handleChange}
            placeholder="Enter Raw Material ID"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="raw_material_qty">Raw Material Qty</label>
          <input
            type="text"
            name="raw_material_qty"
            id="raw_material_qty"
            value={formData.raw_material_qty}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="unit">Wastage Unit</label>
          <input
            type="text"
            name="unit"
            id="unit"
            value={formData.unit}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity_produced">Total Produced</label>
          <input
            type="text"
            name="quantity_produced"
            id="quantity_produced"
            value={formData.quantity_produced}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-submit">
          <input type="submit" value="💾 Save Production" />
        </div>
      </form>
    </div>
  );
};

export default CreateProduction;
