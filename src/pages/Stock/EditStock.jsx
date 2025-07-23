import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditStock = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [form, setForm] = useState({
    product_id: "",
    qty: "",
    transaction_type_id: "",
    warehouse_id: "",
    created_at: "",
  });

  const [products, setProducts] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stockRes = await fetch(`${baseUrl}/stocks/${id}`);
        const stockData = await stockRes.json();
        const stock = stockData.data ?? stockData;

        setForm({
          product_id: stock.product_id || "",
          qty: stock.qty || "",
          transaction_type_id: stock.transaction_type_id || "",
          warehouse_id: stock.warehouse_id || "",
          created_at: formatDatetimeLocal(stock.created_at),
        });

        const [productsRes, typesRes, warehousesRes] = await Promise.all([
          fetch(`${baseUrl}/products`),
          fetch(`${baseUrl}/transaction-types`),
          fetch(`${baseUrl}/warehouses`),
        ]);

        const [productsData, typesData, warehousesData] = await Promise.all([
          productsRes.json(),
          typesRes.json(),
          warehousesRes.json(),
        ]);

        setProducts(productsData);
        setTransactionTypes(typesData);
        setWarehouses(warehousesData);
        setLoading(false);
      } catch (err) {
        console.error("Error loading stock:", err);
        setMessage({ type: "danger", text: "Failed to load data." });
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/stocks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Stock updated successfully." });
        setTimeout(() => navigate("/stocks"), 1500);
      } else {
        setMessage({ type: "danger", text: result.message || "Update failed." });
      }
    } catch (err) {
      console.error("Update error:", err);
      setMessage({ type: "danger", text: "An error occurred." });
    }
  };

  const formatDatetimeLocal = (datetime) => {
    if (!datetime) return "";
    const date = new Date(datetime);
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toISOString().slice(0, 16);
  };



  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Edit Stock</h3>
        <Link to="/stocks" className="btn btn-success">← Back</Link>
      </div>


      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light shadow-sm">
        <div className="mb-3">
          <label htmlFor="product_id" className="form-label">Product</label>
          <select className="form-select" name="product_id" value={form.product_id} onChange={handleChange}>
            <option value="">-- Select Product --</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="qty" className="form-label">Quantity</label>
          <input type="number" className="form-control" name="qty" value={form.qty} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="transaction_type_id" className="form-label">Transaction Type</label>
          <select className="form-select" name="transaction_type_id" value={form.transaction_type_id} onChange={handleChange}>
            <option value="">-- Select Type --</option>
            {transactionTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="warehouse_id" className="form-label">Warehouse</label>
          <select className="form-select" name="warehouse_id" value={form.warehouse_id} onChange={handleChange}>
            <option value="">-- Select Warehouse --</option>
            {warehouses.map((wh) => (
              <option key={wh.id} value={wh.id}>{wh.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="created_at" className="form-label">Created At</label>
          <input type="datetime-local" className="form-control" name="created_at" value={form.created_at} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary w-100">Update Stock</button>
      </form>
    </div>
  );
};

export default EditStock;
