import React, { useState } from "react";
import '../../CSS/CreateStock.css'; 

const CreateStock = () => {
  const [formData, setFormData] = useState({
    product_id: "",
    qty: "",
    transaction_type_id: "",
    created_at: "",
    warehouse_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stockData = new FormData();
    stockData.append("product_id", formData.product_id);
    stockData.append("qty", formData.qty);
    stockData.append("transaction_type_id", formData.transaction_type_id);
    stockData.append("created_at", formData.created_at);
    stockData.append("warehouse_id", formData.warehouse_id);

    try {
      const response = await fetch("http://anayet.intelsofts.com/project_app/public/api/stocks", {
        method: "POST",
        body: stockData,
      });

      if (response.ok) {
        alert("✅ Stock created successfully!");
        setFormData({
          product_id: "",
          qty: "",
          transaction_type_id: "",
          created_at: "",
          warehouse_id: "",
        });
      } else {
        const error = await response.json();
        alert("❌ Failed to create stock: " + (error.message || "Unknown error"));
      }
    } catch (error) {
      alert("❌ Error: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Stock</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product_id">Product</label>
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
          <label htmlFor="qty">Quantity</label>
          <input
            type="number"
            name="qty"
            id="qty"
            value={formData.qty}
            onChange={handleChange}
            placeholder="Enter Quantity"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="transaction_type_id">Transaction Type</label>
          <input
            type="text"
            name="transaction_type_id"
            id="transaction_type_id"
            value={formData.transaction_type_id}
            onChange={handleChange}
            placeholder="Enter Transaction Type ID"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="created_at">Created At</label>
          <input
            type="datetime-local"
            name="created_at"
            id="created_at"
            value={formData.created_at}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="warehouse_id">Warehouse</label>
          <input
            type="text"
            name="warehouse_id"
            id="warehouse_id"
            value={formData.warehouse_id}
            onChange={handleChange}
            placeholder="Enter Warehouse ID"
            required
          />
        </div>

        <button type="submit" className="btn-submit">💾 Save Stock</button>
      </form>
    </div>
  );
};

export default CreateStock;
