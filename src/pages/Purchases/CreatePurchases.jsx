import React, { useEffect, useState } from "react";

const CreatePurchases = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [purchaseId, setPurchaseId] = useState(1);
  const [cart, setCart] = useState([]);

  // Form state
  const [form, setForm] = useState({
    supplier_id: "",
    warehouse_id: "",
    purchase_date: new Date().toISOString().slice(0, 10),
    delivery_date: new Date().toISOString().slice(0, 10),
    shipping_address: "",
    remark: "",
  });

  // Inputs for adding product to cart
  const [selectedProductId, setSelectedProductId] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [discount, setDiscount] = useState("");

  // Fetch initial data for dropdowns and purchase ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost/laravel12/project_app/public/api/purchases/init");
        const data = await res.json();

        setSuppliers(data.suppliers || []);
        setWarehouses(data.warehouses || []);
        setProducts(data.products || []);
        setPurchaseId(data.next_purchase_id || 1);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add product to cart
  const addToCart = () => {
    if (!selectedProductId) {
      alert("Please select a product");
      return;
    }
    if (qty <= 0 || price <= 0) {
      alert("Please enter valid quantity and price");
      return;
    }

    const product = products.find((p) => p.id === parseInt(selectedProductId));
    if (!product) {
      alert("Invalid product selected");
      return;
    }

    setCart((prev) => [
      ...prev,
      {
        product_id: selectedProductId,
        name: product.name,
        price: parseFloat(price),
        qty: parseInt(qty),
        discount: parseFloat(discount) || 0,
      },
    ]);

    // Reset inputs
    setSelectedProductId("");
    setPrice("");
    setQty("");
    setDiscount("");
  };

  // Remove product from cart by index
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalDiscount = cart.reduce((acc, item) => acc + item.discount, 0);
  const netTotal = subtotal - totalDiscount;

  // Submit purchase order
  const processPurchase = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const payload = {
      ...form,
      purchase_total: netTotal,
      paid_amount: netTotal,
      discount: totalDiscount,
      vat: 0,
      items: cart.map(({ product_id, qty, price, discount }) => ({
        product_id,
        qty,
        price,
        discount,
        vat: 0,
      })),
    };

    try {
      const res = await fetch("http://anayet.intelsofts.com/project_app/public/api/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resultText = await res.text();
      let resultJson;
      try {
        resultJson = JSON.parse(resultText);
      } catch {
        alert("Invalid JSON response from API");
        return;
      }

      if (resultJson.msg === "Success") {
        alert(`Purchase ID ${resultJson.id} saved successfully!`);
        setCart([]);
        setForm({
          supplier_id: "",
          warehouse_id: "",
          purchase_date: new Date().toISOString().slice(0, 10),
          delivery_date: new Date().toISOString().slice(0, 10),
          shipping_address: "",
          remark: "",
        });
      } else {
        alert("API Error: " + (resultJson.error || JSON.stringify(resultJson)));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to API");
    }
  };

  return (
    <div className="container p-4">
      <h2>Create Purchase</h2>

      <div className="row mb-3">
        <div className="col-md-4">
          <label>Warehouse</label>
          <select name="warehouse_id" value={form.warehouse_id} onChange={handleChange} className="form-control">
            <option value="">-- Select Warehouse --</option>
            {warehouses.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label>Supplier</label>
          <select name="supplier_id" value={form.supplier_id} onChange={handleChange} className="form-control">
            <option value="">-- Select Supplier --</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <label className="mt-2">Shipping Address</label>
          <textarea
            name="shipping_address"
            value={form.shipping_address}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-4">
          <p>
            <strong>Purchase ID:</strong> {purchaseId}
          </p>

          <label>Purchase Date</label>
          <input
            type="date"
            name="purchase_date"
            value={form.purchase_date}
            onChange={handleChange}
            className="form-control"
          />

          <label>Delivery Date</label>
          <input
            type="date"
            name="delivery_date"
            value={form.delivery_date}
            onChange={handleChange}
            className="form-control"
          />
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
            <th>
              <button className="btn btn-warning btn-sm" onClick={clearCart}>
                Clear
              </button>
            </th>
          </tr>
          <tr>
            <td></td>
            <td>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="form-control"
              >
                <option value="">-- Select Product --</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control"
              />
            </td>
            <td>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="form-control"
              />
            </td>
            <td>
              <input
                type="number"
                step="0.01"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="form-control"
              />
            </td>
            <td></td>
            <td>
              <button className="btn btn-success btn-sm" onClick={addToCart}>
                +
              </button>
            </td>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price.toFixed(2)}</td>
                <td>{item.qty}</td>
                <td>{item.discount.toFixed(2)}</td>
                <td>{(item.price * item.qty - item.discount).toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>
                    X
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No items added
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="row mt-3">
        <div className="col-md-6">
          <label>Remark</label>
          <textarea name="remark" value={form.remark} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-6">
          <table className="table">
            <tbody>
              <tr>
                <th>Subtotal</th>
                <td>{subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Discount</th>
                <td>{totalDiscount.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Total</th>
                <td>{netTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-end">
        <button className="btn btn-primary" onClick={processPurchase}>
          Process Purchase
        </button>
      </div>
    </div>
  );
};

export default CreatePurchases;
