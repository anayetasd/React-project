import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditProduction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [form, setForm] = useState({
    production_date: "",
    product_id: "",
    raw_material_id: "",
    raw_material_qty: "",
    unit: "",
    quantity_produced: ""
  });

  const [products, setProducts] = useState([]);
  const [rawmaterials, setRawmaterials] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const prodRes = await fetch(`${baseUrl}/productions/${id}`);
      const prodData = await prodRes.json();

      const productRes = await fetch(`${baseUrl}/products`);
      const productData = await productRes.json();

      const rawRes = await fetch(`${baseUrl}/rawmaterials`);
      const rawData = await rawRes.json();

      console.log("Production Data:", prodData);

      if (prodData?.production) {
        setForm({
          production_date: prodData.production.production_date || "",
          product_id: prodData.production.product_id || "",
          raw_material_id: prodData.production.raw_material_id || "",
          raw_material_qty: prodData.production.raw_material_qty?.toString() || "", // <-- toString() added
          unit: prodData.production.unit || "",
          quantity_produced: prodData.production.quantity_produced?.toString() || ""
        });
      }

      setProducts(productData?.products || []);
      setRawmaterials(rawData?.rawmaterials || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/productions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        navigate("/productions");
      } else {
        const errData = await response.json();
        setError(errData.message || "Failed to update.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError("Error submitting form.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Production</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Production Date</label>
          <input
            type="date"
            name="production_date"
            value={form.production_date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Product</label>
          <select
            name="product_id"
            value={form.product_id}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name || "Unnamed"}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Raw Material</label>
          <select
            name="raw_material_id"
            value={form.raw_material_id}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Raw Material</option>
            {rawmaterials.map((raw) => (
              <option key={raw.id} value={raw.id}>
                {raw.name || "Unnamed"}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Raw Material Quantity</label>
          <input
            type="number"
            name="raw_material_qty"
            value={form.raw_material_qty}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Unit</label>
          <input
            type="text"
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity Produced</label>
          <input
            type="number"
            name="quantity_produced"
            value={form.quantity_produced}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Production
        </button>
        <Link to="/productions" className="btn btn-secondary ms-2">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default EditProduction;
