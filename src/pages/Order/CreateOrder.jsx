import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderId, setOrderId] = useState(1);
  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    order_date: new Date().toISOString().split("T")[0],
    delivery_date: new Date().toISOString().split("T")[0],
    shipping_address: "",
    remark: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/laravel12/project_app/public/api/orders/max")
      .then(res => res.json())
      .then(data => setOrderId(data.max_id + 1 || 1));

    fetch("http://localhost/laravel12/project_app/public/api/customers")
      .then(res => res.json())
      .then(data => setCustomers(data.customers));

    fetch("http://localhost/laravel12/project_app/public/api/products")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  const handleAddToCart = () => {
    const productSelect = document.getElementById("cmbProduct");
    const name = productSelect.options[productSelect.selectedIndex].text;
    const product_id = productSelect.value;
    const price = parseFloat(document.getElementById("txtPrice").value);
    const qty = parseInt(document.getElementById("txtQty").value);
    const discount = parseFloat(document.getElementById("txtDiscount").value || 0);

    if (!product_id || qty <= 0 || price <= 0) {
      alert("Product, price, or quantity invalid");
      return;
    }

    const newItem = { product_id, name, price, qty, discount };
    setCart([...cart, newItem]);
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleSubmit = () => {
    if (!form.customer_id || cart.length === 0) {
      alert("Customer and cart are required");
      return;
    }

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty - item.discount), 0);

    const payload = {
      ...form,
      order_total: subtotal,
      paid_amount: subtotal,
      discount: 0,
      vat: 0,
      items: cart.map(item => ({
        product_id: item.product_id,
        qty: item.qty,
        price: item.price,
        vat: 0,
        discount: item.discount
      }))
    };

    fetch("http://anayet.intelsofts.com/project_app/public/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(json => {
        if (json.msg === "Success") {
          alert("Order ID " + json.id + " saved.");
          setCart([]);
          navigate("/orders");
        } else {
          alert("Failed to save: " + JSON.stringify(json));
        }
      })
      .catch(err => {
        console.error("API Error:", err);
        alert("API connection error");
      });
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Create New Order</h2>

      <div className="row mb-3">
        <div className="col-md-4">
          <label>Customer</label>
          <select className="form-select" value={form.customer_id} onChange={e => setForm({ ...form, customer_id: e.target.value })}>
            <option value="">-- Select Customer --</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <label className="mt-3">Shipping Address</label>
          <textarea className="form-control" value={form.shipping_address} onChange={e => setForm({ ...form, shipping_address: e.target.value })}></textarea>
        </div>

        <div className="col-md-4">
          <label>Order Date</label>
          <input type="date" className="form-control" value={form.order_date} onChange={e => setForm({ ...form, order_date: e.target.value })} />

          <label className="mt-3">Due Date</label>
          <input type="date" className="form-control" value={form.delivery_date} onChange={e => setForm({ ...form, delivery_date: e.target.value })} />
        </div>

        <div className="col-md-4">
          <label>Order ID</label>
          <input type="text" readOnly className="form-control" value={orderId} />

          <label className="mt-3">Remark</label>
          <textarea className="form-control" value={form.remark} onChange={e => setForm({ ...form, remark: e.target.value })}></textarea>
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>SN</th>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Discount</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.qty}</td>
              <td>{item.discount}</td>
              <td>{(item.price * item.qty - item.discount).toFixed(2)}</td>
              <td><button className="btn btn-danger btn-sm" onClick={() => removeItem(index)}>Remove</button></td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>
              <select id="cmbProduct" className="form-select">
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </td>
            <td><input type="number" className="form-control" id="txtPrice" /></td>
            <td><input type="number" className="form-control" id="txtQty" /></td>
            <td><input type="number" className="form-control" id="txtDiscount" /></td>
            <td></td>
            <td><button onClick={handleAddToCart} className="btn btn-primary">+</button></td>
          </tr>
        </tbody>
      </table>

      <div className="text-end">
        <button className="btn btn-success" onClick={handleSubmit}>Process Order</button>
      </div>
    </div>
  );
};

export default CreateOrder;
