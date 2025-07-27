import React, { useEffect, useState } from "react";

const CreateOrder = () => {
  const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/`;

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [remark, setRemark] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    qty: 1,
    price: 0,
    vat: 0,
    discount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch(`${baseUrl}customers`),
          fetch(`${baseUrl}products`),
        ]);

        const customersData = await res1.json();
        const productsData = await res2.json();

        setCustomers(customersData.customers ?? customersData);
        setProducts(productsData.products ?? productsData);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchData();
  }, []);

  const calculateTotal = (updatedItems) => {
    const total = updatedItems.reduce((acc, item) => {
      const subtotal = item.qty * item.price;
      const vatAmount = (subtotal * item.vat) / 100;
      const discountAmount = (subtotal * item.discount) / 100;
      return acc + subtotal + vatAmount - discountAmount;
    }, 0);

    setOrderTotal(total);
  };

  const handleAddItem = () => {
    const product = products.find((p) => p.id === newItem.id);
    if (!product) {
      alert("Product select করুন");
      return;
    }

    const itemToAdd = {
      product_id: newItem.id,
      name: product.name,
      qty: parseFloat(newItem.qty),
      price: parseFloat(newItem.price),
      vat: parseFloat(newItem.vat) || 0,
      discount: parseFloat(newItem.discount) || 0,
    };

    const updatedItems = [...items, itemToAdd];
    setItems(updatedItems);
    calculateTotal(updatedItems);

    setNewItem({ id: "", name: "", qty: 1, price: 0, vat: 0, discount: 0 });
  };

  const handleSubmit = async () => {
    if (!customerId) {
      alert("Select customer");
      return;
    }

    if (!orderDate || items.length === 0) {
      alert("Select date and minimum one product");
      return;
    }

    const payload = {
      customer_id: parseInt(customerId),
      order_date: orderDate,
      delivery_date: orderDate,
      shipping_address: shippingAddress,
      order_total: orderTotal,
      paid_amount: orderTotal,
      remark: remark || "N/A",
      items: items,
    };

    try {
      const response = await fetch(`${baseUrl}orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const res = await response.json();

      if (response.ok) {
        alert(`✅ Order Saved Successfully (ID: ${res.id})`);
        setItems([]);
        setOrderTotal(0);
      } else {
        alert("Save failed: " + (res.message || "Unknown error"));
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Create Order</h2>
      </div>

      <div style={styles.section}>
        <table>
          <tbody>
            <tr>
              <td>Customer Name</td>
              <td>
                <select
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Order Date</td>
              <td>
                <input
                  type="date"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Shipping Address</td>
              <td>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>VAT %</th>
            <th>Discount %</th>
            <th>Add</th>
          </tr>
          <tr>
            <td>
              <select
                value={newItem.id}
                onChange={(e) =>
                  setNewItem({ ...newItem, id: parseInt(e.target.value) })
                }
              >
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="number"
                value={newItem.qty}
                onChange={(e) =>
                  setNewItem({ ...newItem, qty: parseFloat(e.target.value) })
                }
              />
            </td>
            <td>
              <input
                type="number"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: parseFloat(e.target.value) })
                }
              />
            </td>
            <td>
              <input
                type="number"
                value={newItem.vat}
                onChange={(e) =>
                  setNewItem({ ...newItem, vat: parseFloat(e.target.value) })
                }
              />
            </td>
            <td>
              <input
                type="number"
                value={newItem.discount}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    discount: parseFloat(e.target.value),
                  })
                }
              />
            </td>
            <td>
              <button onClick={handleAddItem}>Add</button>
            </td>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>{item.vat}%</td>
              <td>{item.discount}%</td>
              <td>{(item.qty * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.total}>
        Total Amount:{" "}
        <input type="text" value={orderTotal.toFixed(2)} readOnly />
      </div>

      <div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Create Order
        </button>
      </div>
    </div>
  );
};

// Inline CSS
const styles = {
  container: {
    backgroundColor: "#fff",
    width: "100%",
    margin: "auto",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #ddd",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  total: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: "1.1em",
    marginTop: "15px",
  },
};

export default CreateOrder;
