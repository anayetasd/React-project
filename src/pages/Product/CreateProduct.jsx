import React, { useEffect, useState } from "react";

const CreateProduct = () => {
  const [productNames, setProductNames] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    photo: null,
    regular_price: "",
    offer_price: "",
    barcode: "",
  });

  useEffect(() => {
    fetch("http://anayet.intelsofts.com/project_app/public/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProductNames(data.products);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 📷 File input change handler
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const productData = new FormData();
  for (const key in formData) {
    if (formData[key]) {
      productData.append(key, formData[key]);
    }
  }

  try {
    const response = await fetch(
      "http://anayet.intelsofts.com/project_app/public/api/products",
      {
        method: "POST",
        body: productData,
      }
    );

    // Instead of assuming JSON, get text first:
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      if (response.ok) {
        alert("✅ Product created successfully!");
        setFormData({
          name: "",
          photo: null,
          regular_price: "",
          offer_price: "",
          barcode: "",
        });
      } else {
        alert("❌ Failed: " + (data.message || "Server error"));
      }
    } catch {
      // JSON.parse failed => show raw text
      console.error("Response text:", text);
      alert("❌ Server returned invalid JSON (maybe HTML page). Check server logs.");
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
            <label htmlFor="name" className="form-label">Product Name</label>
            <select
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Product</option>
              {productNames.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Product Photo</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
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

          <button type="submit" className="btn btn-primary w-100">
            💾 Save Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
