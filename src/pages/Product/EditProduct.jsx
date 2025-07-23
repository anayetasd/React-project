import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [product, setProduct] = useState({
    name: "",
    photo: "",
    regular_price: "",
    offer_price: "",
    barcode: "",
    product_section_id: "",
  });
  const [sections, setSections] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("Failed to load product:", err));

    fetch(`${baseUrl}/product-sections`)
      .then(res => res.json())
      .then(data => setSections(data))
      .catch(err => console.error("Failed to load sections:", err));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("regular_price", product.regular_price || "");
    formData.append("offer_price", product.offer_price || "");
    formData.append("barcode", product.barcode || "");
    formData.append("product_section_id", product.product_section_id || "");

    if (selectedPhoto) {
      formData.append("photo", selectedPhoto);
    }

    fetch(`${baseUrl}/products/${id}`, {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          alert("✅ Product updated successfully!");
          navigate("/products");
        } else {
          alert("❌ Failed to update product.");
        }
      })
      .catch((err) => console.error("Error submitting form:", err));
  };

  return (
    <div className="container mt-5">
      <Link to="/products" className="btn btn-success mb-3">⬅ Back</Link>

      <div className="form-container bg-white p-4 shadow rounded">
        <h2 className="text-center mb-4">Edit Product</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {product.photo && (
            <div className="mb-3">
              <label className="form-label">Current Photo</label><br />
              <img
                src={`http://anayet.intelsofts.com/project_app/public/img/${product.photo}`}
                alt="Product"
                width="100"
                className="mb-2 rounded"
              />
              <input
                type="file"
                name="photo"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Regular Price</label>
            <input
              type="text"
              name="regular_price"
              value={product.regular_price || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Offer Price</label>
            <input
              type="text"
              name="offer_price"
              value={product.offer_price || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Barcode</label>
            <input
              type="text"
              name="barcode"
              value={product.barcode || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Product Section</label>
            <select
              name="product_section_id"
              value={product.product_section_id}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Section</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">💾 Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
