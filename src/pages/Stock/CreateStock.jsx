import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateStock = () => {
  const navigate = useNavigate();
  const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api';

  const [products, setProducts] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const [form, setForm] = useState({
    product_id: '',
    qty: '',
    transaction_type_id: '',
    created_at: '',
    warehouse_id: ''
  });

  // Utility to set default current datetime in input[type=datetime-local] compatible format
  const getCurrentDateTimeLocal = () => {
    const now = new Date();
    const pad = (num) => (num < 10 ? '0' + num : num);
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  };

  useEffect(() => {
    // Set default datetime now on component load
    setForm(f => ({ ...f, created_at: getCurrentDateTimeLocal() }));

    // Fetch products
    fetch(`${baseUrl}/products`)
      .then(res => res.json())
      .then(data => {
        if (data.products) setProducts(data.products);
        else alert('Failed to load products: Invalid response');
      })
      .catch(() => alert('Failed to load products'));

    // Fetch transaction types
    fetch(`${baseUrl}/transaction_types`)  // <-- make sure API endpoint is correct
      .then(res => res.json())
      .then(data => {
        // transactionTypes API returns an array, so set directly
        if (Array.isArray(data)) setTransactionTypes(data);
        else alert('Failed to load transaction types: Invalid response');
      })
      .catch(() => alert('Failed to load transaction types'));

    // Fetch warehouses
    fetch(`${baseUrl}/warehouses`)
      .then(res => res.json())
      .then(data => {
        if (data.warehouses) setWarehouses(data.warehouses);
        else alert('Failed to load warehouses: Invalid response');
      })
      .catch(() => alert('Failed to load warehouses'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (optional)
    if (!form.product_id || !form.qty || !form.transaction_type_id || !form.created_at || !form.warehouse_id) {
      alert('Please fill all required fields.');
      return;
    }

    fetch(`${baseUrl}/stocks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
      .then(async (res) => {
        if (!res.ok) {
          // Try to parse error message from response
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to save stock');
        }
        return res.json();
      })
      .then(() => {
        alert('✅ Stock saved successfully!');
        navigate('/stocks');
      })
      .catch(err => {
        alert('❌ ' + err.message);
      });
  };

  return (
    <div className="container mt-5">
      <div className="form-container p-4 shadow rounded bg-white">
        <h3 className="text-center mb-4">Create New Stock Entry</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="product_id">Product Name</label>
            <select
              id="product_id"
              name="product_id"
              className="form-select"
              value={form.product_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="qty">Quantity</label>
            <input
              type="number"
              id="qty"
              name="qty"
              className="form-control"
              value={form.qty}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="transaction_type_id">Transaction Type</label>
            <select
              id="transaction_type_id"
              name="transaction_type_id"
              className="form-select"
              value={form.transaction_type_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              {transactionTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="created_at">Created At</label>
            <input
              type="datetime-local"
              id="created_at"
              name="created_at"
              className="form-control"
              value={form.created_at}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="warehouse_id">Warehouse</label>
            <select
              id="warehouse_id"
              name="warehouse_id"
              className="form-select"
              value={form.warehouse_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Warehouse</option>
              {warehouses.map(wh => (
                <option key={wh.id} value={wh.id}>{wh.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">💾 Save Stock</button>
        </form>
      </div>
    </div>
  );
};

export default CreateStock;
