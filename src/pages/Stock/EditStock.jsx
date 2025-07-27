import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditStock = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    product_id: '',
    qty: '',
    transaction_type_id: '',
    created_at: '',
    warehouse_id: ''
  });

  const [stock, setStock] = useState(null);
  const [products, setProducts] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    fetchStock();
    fetchProducts();
    fetchTransactionTypes();
    fetchWarehouses();
  }, []);

  const fetchStock = async () => {
    try {
      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/stocks/${id}`);
      const data = await res.json();
      const s = data.stock ?? data.data ?? data;
      setStock(s);
      setForm({
        product_id: s.product_id,
        qty: s.qty,
        transaction_type_id: s.transaction_type_id,
        created_at: formatDatetime(s.created_at),
        warehouse_id: s.warehouse_id
      });
    } catch (err) {
      console.error('Failed to load stock:', err);
      alert('Failed to load stock data.');
      navigate('/stocks');
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/products`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error('Failed to load products:', err);
      alert('Failed to load products.');
    }
  };

  const fetchTransactionTypes = async () => {
      try {
        const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/transaction_types`);

        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }
        const data = await res.json();
        setTransactionTypes(Array.isArray(data) ? data : data.transaction_types || []);
      } catch (err) {
        console.error('Failed to load transaction types:', err);
        alert('Failed to load transaction types.');
      }
    };


  const fetchWarehouses = async () => {
    try {
      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/warehouses`);
      const data = await res.json();
      setWarehouses(data.warehouses || []);
    } catch (err) {
      console.error('Failed to load warehouses:', err);
      alert('Failed to load warehouses.');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/stocks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const result = await res.json();

      if (res.ok) {
        alert('✅ Stock updated successfully!');
        navigate('/stocks');
      } else {
        alert('❌ Error: ' + (result.message || 'Update failed'));
      }
    } catch (err) {
      console.error(err);
      alert('❌ Update failed due to server error.');
    }
  };

  const formatDatetime = (isoDate) => {
    const date = new Date(isoDate);
    const pad = (n) => (n < 10 ? '0' + n : n);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      {stock && (
        <>
          <Link className="btn btn-success btn-back" to="/stocks">← Back</Link>
          <h3>Edit Stock Entry</h3>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label htmlFor="product_id" className="form-label">Product Name</label>
              <select
                name="product_id"
                value={form.product_id}
                onChange={handleChange}
                id="product_id"
                className="form-select"
                required>
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="qty" className="form-label">Quantity</label>
              <input
                type="number"
                name="qty"
                value={form.qty}
                onChange={handleChange}
                id="qty"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="transaction_type_id" className="form-label">Transaction Type</label>
              <select
                name="transaction_type_id"
                value={form.transaction_type_id}
                onChange={handleChange}
                id="transaction_type_id"
                className="form-select"
                required>
                <option value="">Select Type</option>
                {transactionTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="created_at" className="form-label">Created At</label>
              <input
                type="datetime-local"
                name="created_at"
                value={form.created_at}
                onChange={handleChange}
                id="created_at"
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="warehouse_id" className="form-label">Warehouse</label>
              <select
                name="warehouse_id"
                value={form.warehouse_id}
                onChange={handleChange}
                id="warehouse_id"
                className="form-select"
                required>
                <option value="">Select Warehouse</option>
                {warehouses.map((wh) => (
                  <option key={wh.id} value={wh.id}>{wh.name}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-submit">🔄 Update Stock</button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditStock;
