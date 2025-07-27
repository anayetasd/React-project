import React, { useState, useEffect } from "react";

const MoneyReceipt = () => {
  const [company, setCompany] = useState({ name: "Loading...", address: "" });
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [lastReceiptId, setLastReceiptId] = useState(0);

  const [form, setForm] = useState({
    customer_id: "",
    receipt_date: "",
    shipping_address: "",
    remark: "",
  });

  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({
    product_id: "",
    price: 0,
    discount: 0,
    qty: 1,
  });

  const [loading, setLoading] = useState(false);

  // Format date as yyyy-mm-dd
  const formatDate = (date) => {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // Calculate total amount
  const total = items.reduce(
    (sum, item) => sum + (item.price - item.discount) * item.qty,
    0
  );

  const nextReceiptId = lastReceiptId + 1;

  // Fetch initial data on mount
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [companyRes, custRes, prodRes, mrRes] = await Promise.all([
          fetch("http://anayet.intelsofts.com/project_app/public/api/companies"),
          fetch("http://anayet.intelsofts.com/project_app/public/api/customers"),
          fetch("http://anayet.intelsofts.com/project_app/public/api/products"),
          fetch("http://anayet.intelsofts.com/project_app/public/api/mrs/last"),
        ]);

        if (!companyRes.ok || !custRes.ok || !prodRes.ok || !mrRes.ok) {
          throw new Error("Failed to fetch initial data");
        }

        const companyData = await companyRes.json();
        const customersData = await custRes.json();
        const productsData = await prodRes.json();
        const mrData = await mrRes.json();

        setCompany(companyData.company || { name: "Company", address: "" });
        setCustomers(customersData.customers || []);
        setProducts(productsData.products || []);
        setLastReceiptId(mrData.last_id || 0);

        if (customersData.customers?.length > 0) {
          setForm((prev) => ({
            ...prev,
            customer_id: customersData.customers[0].id,
            receipt_date: formatDate(new Date()),
          }));
        }
      } catch (err) {
        alert("Error loading initial data: " + err.message);
        console.error(err);
      }
    }

    fetchInitialData();
  }, []);

  // Handle form input changes
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  // Handle new item input changes
  const handleNewItemChange = (e) => {
  const { id, value, type } = e.target;
  setNewItem((prev) => ({
    ...prev,
    [id]: id === "product_id" ? Number(value) : type === "number" ? (value === "" ? "" : Number(value)) : value,
  }));
};


  // Add new item to items list with validation
  const addItem = () => {
    if (!newItem.product_id) {
      alert("Please select a product.");
      return;
    }
    if (newItem.price <= 0 || isNaN(newItem.price)) {
      alert("Price must be a valid number greater than zero.");
      return;
    }
    if (newItem.discount < 0 || isNaN(newItem.discount)) {
      alert("Discount must be a valid number and not negative.");
      return;
    }
    if (newItem.qty <= 0 || isNaN(newItem.qty)) {
      alert("Quantity must be at least 1.");
      return;
    }
    if (newItem.discount > newItem.price) {
      alert("Discount cannot be more than price.");
      return;
    }

    const product = products.find((p) => p.id === newItem.product_id);
    if (!product) {
      alert("Selected product not found.");
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        product_id: newItem.product_id,
        name: product.name,
        price: newItem.price,
        discount: newItem.discount,
        qty: newItem.qty,
        vat: 0,
      },
    ]);

    // Reset new item input fields
    setNewItem({
      product_id: "",
      price: 0,
      discount: 0,
      qty: 1,
    });
  };

  // Remove item from items list
  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Print receipt
  const printReceipt = () => {
    window.print();
  };

  // Submit receipt to server
  const submitReceipt = async () => {
    if (items.length === 0) {
      alert("No items added.");
      return;
    }
    if (!form.customer_id) {
      alert("Please select a customer.");
      return;
    }

    const data = {
      customer_id: form.customer_id,
      receipt_date: form.receipt_date,
      shipping_address: form.shipping_address,
      remark: form.remark,
      receipt_total: total,
      paid_amount: total,
      discount: 0,
      vat: 0,
      items: items.map(({ product_id, price, qty, vat, discount }) => ({
        product_id,
        price,
        qty,
        vat,
        discount,
      })),
    };

    try {
      setLoading(true);
      const res = await fetch(
        "http://anayet.intelsofts.com/project_app/public/api/mrs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const json = await res.json();

      if (json.message === "Money Receipt Saved Successfully" && json.mr_id) {
        alert("Receipt saved: ID " + json.mr_id);
        setItems([]);
        setForm((prev) => ({
          ...prev,
          shipping_address: "",
          remark: "",
        }));
        setLastReceiptId(json.mr_id);
      } else {
        alert("Error: " + JSON.stringify(json));
      }
    } catch (err) {
      alert("Failed to connect to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .receipt-wrapper {
          max-width: 1200px;
          margin: 30px auto;
          padding: 30px;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }
        .receipt-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .receipt-header h1 {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 5px;
        }
        .receipt-header p {
          margin: 0;
          font-size: 16px;
          color: #555;
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 25px;
        }
        .form-group label {
          font-weight: 600;
          margin-bottom: 6px;
          display: block;
        }
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
        }
        table.receipt-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .receipt-table th,
        .receipt-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }
        .receipt-table th {
          background-color: #007bff;
          color: white;
          font-weight: 600;
        }
        .btn {
          padding: 8px 15px;
          border: none;
          border-radius: 5px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        }
        .btn-primary {
          background-color: #007bff;
          color: white;
        }
        .btn-danger {
          background-color: #dc3545;
          color: white;
        }
        .btn-success {
          background-color: #28a745;
          color: white;
        }
        .summary {
          margin-top: 25px;
          text-align: right;
          font-weight: 600;
          font-size: 16px;
        }
        .btn-group-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 25px;
        }
      `}</style>

      <div className="receipt-wrapper">
        <div className="receipt-header">
          <h1>{company.name}</h1>
          <p>{company.address}</p>
          <h2 style={{ marginTop: "10px" }}>Money Receipt</h2>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="customer_id">Customer</label>
            <select
              id="customer_id"
              value={form.customer_id}
              onChange={handleFormChange}
            >
              <option value="" disabled>
                Select Customer
              </option>
              {customers.map((cust) => (
                <option key={cust.id} value={cust.id}>
                  {cust.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="receipt_date">Date</label>
            <input
              type="date"
              id="receipt_date"
              value={form.receipt_date}
              onChange={handleFormChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mr_id">Receipt ID</label>
            <input type="text" value={nextReceiptId} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="shipping_address">Shipping Address</label>
            <textarea
              id="shipping_address"
              rows="2"
              value={form.shipping_address}
              onChange={handleFormChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="remark">Remark</label>
            <textarea
              id="remark"
              rows="2"
              value={form.remark}
              onChange={handleFormChange}
            />
          </div>
        </div>

        <table className="receipt-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.price.toFixed(2)}</td>
                <td>{item.discount.toFixed(2)}</td>
                <td>{((item.price - item.discount) * item.qty).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(idx)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>
                <select
                  id="product_id"
                  value={newItem.product_id}
                  onChange={handleNewItemChange}
                >
                  <option value="" disabled>
                    Select Product
                  </option>
                  {products.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  id="qty"
                  min="1"
                  value={newItem.qty}
                  onChange={handleNewItemChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  id="price"
                  min="0"
                  value={newItem.price}
                  onChange={handleNewItemChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  id="discount"
                  min="0"
                  value={newItem.discount}
                  onChange={handleNewItemChange}
                />
              </td>
              <td></td>
              <td>
                <button className="btn btn-primary" onClick={addItem}>
                  +
                </button>
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="summary">Total: {total.toFixed(2)}</div>

        <div className="btn-group-actions">
          <button onClick={printReceipt} className="btn btn-primary">
            🖨 Print
          </button>
          <button
            className="btn btn-success"
            onClick={submitReceipt}
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default MoneyReceipt;
