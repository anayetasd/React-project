import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const baseURL = "http://anayet.intelsofts.com/project_app/public/api";

const EditProduct = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    photo: null,
    regular_price: "",
    offer_price: "",
    barcode: "",
    // product_section_id removed here
  });

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${baseURL}/products/${productId}`);
        const data = await res.json();
        setProduct(data.product);
        setForm({
          name: data.product.name || "",
          photo: null,
          regular_price: data.product.regular_price || "",
          offer_price: data.product.offer_price || "",
          barcode: data.product.barcode || "",
          // product_section_id removed here
        });
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      photo: e.target.files[0] || null,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (val !== null) {
          formData.append(key, val);
        }
      });

      const res = await fetch(`${baseURL}/products/${productId}`, {
        method: "POST",
        headers: {
          "X-HTTP-Method-Override": "PUT",
          // Don't set Content-Type when sending FormData
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      navigate("/products");
    } catch (error) {
      console.error(error);
      alert("Error updating product");
    }
  };

  if (!product) {
    return <div className="container">Loading product data...</div>;
  }

  return (
    <div className="container">
      <Link className="btn btn-success btn-back" to="/products">
        ⬅ Back
      </Link>

      <div className="form-container">
        <h2>Edit Product</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Current Photo</label>
            <br />
            {product.photo && (
              <img
                src={`/img/${product.photo}`}
                alt="Product"
                width={100}
                className="mb-2 rounded"
              />
            )}
            <input
              name="photo"
              type="file"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Regular Price</label>
            <input
              name="regular_price"
              value={form.regular_price}
              onChange={handleChange}
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Offer Price</label>
            <input
              name="offer_price"
              value={form.offer_price}
              onChange={handleChange}
              type="text"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Barcode</label>
            <input
              name="barcode"
              value={form.barcode}
              onChange={handleChange}
              type="text"
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            💾 Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
