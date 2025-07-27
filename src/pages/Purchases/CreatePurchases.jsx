import React, { useEffect, useState } from 'react';

const CreatePurchase = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [form, setForm] = useState({
    supplier_id: '',
    warehouse_id: '',
    purchase_date: new Date().toISOString().substr(0, 10),
    delivery_date: new Date().toISOString().substr(0, 10),
    shipping_address: '',
    remark: '',
    purchase_total: 0,
    paid_amount: 0,
    discount: 0,
    vat: 0
  });
  const [selected, setSelected] = useState({
    product_id: '',
    price: '',
    qty: '',
    discount: ''
  });

  const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sRes, wRes, pRes] = await Promise.all([
          fetch(`${baseUrl}suppliers`),
          fetch(`${baseUrl}warehouses`),
          fetch(`${baseUrl}products`)
        ]);
        const suppliersJson = await sRes.json();
        const warehousesJson = await wRes.json();
        const productsJson = await pRes.json();
        setSuppliers(suppliersJson.suppliers || []);
        setWarehouses(warehousesJson.warehouses || []);
        setProducts(productsJson.products || []);
      } catch (err) {
        console.error('Error loading data:', err);
      }
    };
    fetchData();
  }, []);

  const handleSelectedChange = (e) => {
    const { name, value } = e.target;
    setSelected(prev => ({ ...prev, [name]: value }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const addToCart = () => {
    const { product_id, price, qty, discount } = selected;
    if (!product_id || price <= 0 || qty <= 0) return alert('Product info missing');

    const name = products.find(p => p.id == product_id)?.name || 'Unknown';

    const newCart = [...cart, {
      product_id,
      name,
      price: parseFloat(price),
      qty: parseInt(qty),
      discount: parseFloat(discount || 0)
    }];
    setCart(newCart);
    setSelected({ product_id: '', price: '', qty: '', discount: '' });
    refreshTotals(newCart);
  };

  const refreshTotals = (cartItems) => {
    let sub = 0;
    cartItems.forEach(i => {
      sub += (i.price * i.qty) - i.discount;
    });
    setSubtotal(sub);
    setNetTotal(sub);
  };

  const removeRow = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    refreshTotals(newCart);
  };

  const clearCart = () => {
    setCart([]);
    refreshTotals([]);
  };

  const processPurchase = async () => {
    if (!form.supplier_id || !form.warehouse_id || cart.length === 0) {
      alert('Fill all required fields');
      return;
    }

    const payload = {
      ...form,
      purchase_total: netTotal,
      paid_amount: netTotal,
      items: cart.map(i => ({
        product_id: i.product_id,
        qty: i.qty,
        price: i.price,
        discount: i.discount,
        vat: 0
      }))
    };

    try {
      const res = await fetch(`${baseUrl}purchases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const json = await res.json();

      if (json.msg === 'Success') {
        alert('Purchase saved with ID: ' + json.id);
        clearCart();
      } else {
        alert('Save failed: ' + JSON.stringify(json));
      }
    } catch (err) {
      console.error(err);
      alert('API error');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Create Purchase</h2>

      <div className="row mb-3">
        <div className="col-md-4">
          <label>Warehouse</label>
          <select name="warehouse_id" className="form-control" value={form.warehouse_id} onChange={handleFormChange}>
            <option value="">Select</option>
            {warehouses.map(w => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label>Supplier</label>
          <select name="supplier_id" className="form-control" value={form.supplier_id} onChange={handleFormChange}>
            <option value="">Select</option>
            {suppliers.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <label className="mt-2">Shipping Address</label>
          <textarea name="shipping_address" className="form-control" value={form.shipping_address} onChange={handleFormChange}></textarea>
        </div>
        <div className="col-md-4">
          <label>Purchase Date</label>
          <input type="date" name="purchase_date" className="form-control" value={form.purchase_date} onChange={handleFormChange} />
          <label className="mt-2">Delivery Date</label>
          <input type="date" name="delivery_date" className="form-control" value={form.delivery_date} onChange={handleFormChange} />
        </div>
      </div>

      <table className="table table-bordered mb-3">
        <thead className="table-info">
          <tr>
            <th>SN</th>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Discount</th>
            <th>Subtotal</th>
            <th><button className="btn btn-sm btn-danger" onClick={clearCart}>Clear</button></th>
          </tr>
          <tr>
            <td>#</td>
            <td>
              <select name="product_id" className="form-control" value={selected.product_id} onChange={handleSelectedChange}>
                <option value="">Choose</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </td>
            <td><input name="price" type="number" className="form-control" value={selected.price} onChange={handleSelectedChange} /></td>
            <td><input name="qty" type="number" className="form-control" value={selected.qty} onChange={handleSelectedChange} /></td>
            <td><input name="discount" type="number" className="form-control" value={selected.discount} onChange={handleSelectedChange} /></td>
            <td></td>
            <td><button className="btn btn-sm btn-success" onClick={addToCart}>+</button></td>
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
              <td>{(item.qty * item.price) - item.discount}</td>
              <td><button className="btn btn-sm btn-danger" onClick={() => removeRow(index)}>X</button></td>
            </tr>
          ))}
          {cart.length === 0 && (
            <tr><td colSpan="7" className="text-center">No items in cart.</td></tr>
          )}
        </tbody>
      </table>

      <div className="row">
        <div className="col-md-6">
          <label>Remark</label>
          <textarea name="remark" className="form-control" value={form.remark} onChange={handleFormChange}></textarea>
        </div>
        <div className="col-md-6">
          <table className="table">
            <tbody>
              <tr><th>Subtotal</th><td>{subtotal}</td></tr>
              <tr><th>Total</th><td>{netTotal}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-end">
        <button className="btn btn-primary" onClick={processPurchase}>Process Purchase</button>
      </div>
    </div>
  );
};

export default CreatePurchase;
