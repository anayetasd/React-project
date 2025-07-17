import React, { useEffect, useState } from "react";


const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    photo: null,
    regular_price: "",
    offer_price: "",
    barcode: "",
    product_unit_id: "",
    product_section_id: "",
    product_category_id: "",
  });

  const [units, setUnits] = useState([]);
  const [sections, setSections] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch dropdown data
  useEffect(() => {
    fetch("http://anayet.intelsofts.com/project_app/public/api/product-dropdowns")
      .then(res => res.json())
      .then(data => {
        setUnits(data.units || []);
        setSections(data.sections || []);
        setCategories(data.categories || []);
      })
      .catch(err => console.error("Dropdown fetch error:", err));
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = new FormData();

    for (const key in formData) {
      productData.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://anayet.intelsofts.com/project_app/public/api/products", {
        method: "POST",
        body: productData,
      });

      if (response.ok) {
        alert("✅ Product created successfully!");
        setFormData({
          name: "",
          photo: null,
          regular_price: "",
          offer_price: "",
          barcode: "",
          product_unit_id: "",
          product_section_id: "",
          product_category_id: "",
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
    <div className="container">
      <div className="form-container mt-5">
        <h2>Create New Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Product Photo</label>
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              className="form-control"
              accept="image/*"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Regular Price</label>
            <input
              type="number"
              name="regular_price"
              step="0.01"
              value={formData.regular_price}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Offer Price</label>
            <input
              type="number"
              name="offer_price"
              step="0.01"
              value={formData.offer_price}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Barcode</label>
            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Product Unit</label>
            <select
              name="product_unit_id"
              value={formData.product_unit_id}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Unit</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Product Section</label>
            <select
              name="product_section_id"
              value={formData.product_section_id}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Section</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Product Category</label>
            <select
              name="product_category_id"
              value={formData.product_category_id}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            💾 Save Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
