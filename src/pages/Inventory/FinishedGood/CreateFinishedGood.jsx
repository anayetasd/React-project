import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateFinishedGoods = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    product_name: "",
    quantity: "",
    price: "",
    order_date: "",
    finished_good_status: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://anayet.intelsofts.com/project_app/public/api/finishedGoods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        navigate("/finishedGoods");
      } else {
        alert("Failed to save finished goods.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="form-wrapper bg-white p-4 rounded shadow mt-4" style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <a href="/finishedGoods" className="btn btn-secondary mb-3">← Back to Finished Goods</a>
      <h2 className="text-center text-primary mb-4">Add New Finished Good</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="product_name">Product Name</label>
          <input type="text" name="product_name" className="form-control" value={form.product_name} onChange={handleChange} required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="quantity">Quantity</label>
          <input type="number" name="quantity" className="form-control" value={form.quantity} onChange={handleChange} required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="price">Price</label>
          <input type="number" name="price" className="form-control" value={form.price} onChange={handleChange} required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="order_date">Order Date</label>
          <input type="date" name="order_date" className="form-control" value={form.order_date} onChange={handleChange} required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="finished_good_status">Status</label>
          <select name="finished_good_status" className="form-select" value={form.finished_good_status} onChange={handleChange} required>
            <option value="">-- Select Status --</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <input type="submit" className="btn btn-primary w-100" value="Save Finished Good" />
      </form>
    </div>
  );
};

export default CreateFinishedGoods;
