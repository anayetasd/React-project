import React, { useState } from "react";
import '../../CSS/CreateSupplier.css'



const CreateSupplier = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supplierData = new FormData();
    supplierData.append("name", formData.name);
    supplierData.append("mobile", formData.mobile);
    supplierData.append("email", formData.email);
    if (formData.photo) {
      supplierData.append("photo", formData.photo);
    }

    try {
      const response = await fetch("http://anayet.intelsofts.com/project_app/public/api/suppliers", {
        method: "POST",
        body: supplierData,
      });

      if (response.ok) {
        alert("Supplier created successfully");
        setFormData({ name: "", mobile: "", email: "", photo: null });
      } else {
        const error = await response.json();
        alert("Failed to create supplier: " + (error.message || "Unknown error"));
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>New Supplier</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Enter supplier name" required />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input type="text" name="mobile" id="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter mobile number" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo</label>
          <input type="file" name="photo" id="photo" onChange={handleChange} />
        </div>

        <button type="submit" className="btn-submit">💾 Save Supplier</button>
      </form>
    </div>
  );
};

export default CreateSupplier;
