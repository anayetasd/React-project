import React, { useEffect, useState } from "react";
import '../../CSS/CreateMoney.css'
const CreateMoney = () => {
  const [company, setCompany] = useState({ name: "", address: "" });
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [mrId, setMrId] = useState(1);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    customer_id: "",
    receipt_date: new Date().toISOString().slice(0, 10),
    shipping_address: "",
    remark: "",
  });

  const fetchInitialData = async () => {
    try {
      const res = await fetch("http://anayet.intelsofts.com/project_app/public/api/mrs/create");
      const data = await res.json();
      setCompany(data.company);
      setCustomers(data.customers);
      setProducts(data.products);
      setMrId(data.last_mr_id + 1);
    } catch (error) {
      alert("Failed to load data");
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addItem = () => {
    const select = document.getElementById("product_id");
    const product_id = select.value;
    const name = select.options[select.selectedIndex].text;
    const price = parseFloat(document.getElementById("price").value || 0);
    const discount = parseFloat(document.getElementById("discount").value || 0);

    if (!product_id || price <= 0) {
      alert("Please enter valid product and price");
      return;
    }

    setItems([...items, { product_id, name, price, qty: 1, discount, vat: 0 }]);

    document.getElementById("price").value = "";
    document.getElementById("discount").value = "";
  };

  const removeItem = (i) => {
    const updated = [...items];
    updated.splice(i, 1);
    setItems(updated);
  };

  const getTotal = () => {
    return items.reduce((sum, item) => sum + (item.price - item.discount), 0).toFixed(2);
  };

  const handleSubmit = async () => {
    if (items.length === 0) return alert("No items added");

    const data = {
      ...form,
      receipt_total: parseFloat(getTotal()),
      paid_amount: parseFloat(getTotal()),
      discount: 0,
      vat: 0,
      items: items.map(item => ({
        product_id: item.product_id,
        price: item.price,
        qty: item.qty,
        vat: item.vat,
        discount: item.discount,
      }))
    };

    try {
      const res = await fetch("http://localhost/laravel12/project_app/public/api/mrs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.message === "Money Receipt Saved Successfully" && json.mr_id) {
        alert("Receipt saved: ID " + json.mr_id);
        setItems([]);
      } else {
        alert("Error: " + JSON.stringify(json));
      }
    } catch (err) {
      alert("Failed to connect to server");
    }
  };

  return (
    <div className="receipt-wrapper">
      <div className="receipt-header">
        <h1>{company.name}</h1>
        <p>{company.address}</p>
        <h2 style={{ marginTop: 10 }}>Money Receipt</h2>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Customer</label>
          <select name="customer_id" onChange={handleFormChange} className="form-control">
            <option value="">--Select--</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input type="date" name="receipt_date" value={form.receipt_date} onChange={handleFormChange} />
        </div>

        <div className="form-group">
          <label>Receipt ID</label>
          <input type="text" value={mrId} readOnly />
        </div>

        <div className="form-group">
          <label>Shipping Address</label>
          <textarea name="shipping_address" onChange={handleFormChange}></textarea>
        </div>

        <div className="form-group">
          <label>Remark</label>
          <textarea name="remark" onChange={handleFormChange}></textarea>
        </div>
      </div>

      <table className="receipt-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.discount}</td>
              <td>{(item.price - item.discount).toFixed(2)}</td>
              <td><button className="btn btn-danger btn-sm" onClick={() => removeItem(i)}>X</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <select id="product_id">
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </td>
            <td><input type="number" id="price" /></td>
            <td><input type="number" id="discount" /></td>
            <td></td>
            <td><button className="btn btn-primary" onClick={addItem}>+</button></td>
          </tr>
        </tfoot>
      </table>

      <div className="summary">
        Total: <span id="receipt-total">{getTotal()}</span>
      </div>

      <div className="btn-group-actions">
        <button className="btn btn-primary" onClick={() => window.print()}>🖨 Print</button>
        <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default CreateMoney;
