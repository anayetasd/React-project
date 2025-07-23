import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditProduction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [form, setForm] = useState({
    production_date: "",
    product_id: "",
    qty: "",
    note: "",
  });

  const [products, setProducts] = useState([]);
  const [unit, setUnit] = useState("");
  const [totalProduced, setTotalProduced] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load product list
    fetch(`${baseUrl}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Invalid product response:", data);
        }
      })
      .catch((error) => {
        console.error("Product fetch failed:", error);
      });

    // Load production by ID
    fetch(`${baseUrl}/productions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setForm({
            production_date: data.production_date || "",
            product_id: data.product_id || "",
            qty: data.qty || "",
            note: data.note || "",
          });
          setUnit(data.unit || "");
          setTotalProduced(data.total_produced || "");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Production load error:", error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/productions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Production updated successfully!");
        navigate("/productions");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Something went wrong while updating.");
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Edit Production</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Production Date</label>
          <input
            type="date"
            className="form-control"
            name="production_date"
            value={form.production_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Product</label>
          <select
            className="form-control"
            name="product_id"
            value={form.product_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Product --</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            name="qty"
            value={form.qty}
            onChange={handleChange}
            required
          />
        </div>

        {/* Read-only Unit field */}
        <div className="mb-3">
          <label>Unit</label>
          <input
            type="text"
            className="form-control"
            value={unit}
            readOnly
          />
        </div>

        {/* Read-only Total Produced field */}
        <div className="mb-3">
          <label>Total Produced</label>
          <input
            type="text"
            className="form-control"
            value={totalProduced}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label>Note</label>
          <textarea
            className="form-control"
            name="note"
            value={form.note}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Production
        </button>
        <Link to="/productions" className="btn btn-secondary ms-2">Cancel</Link>
      </form>
    </div>
  );
};

export default EditProduction;
