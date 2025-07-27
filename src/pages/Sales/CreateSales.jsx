import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateSale = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customer_id: "",
    total_amount: "",
    discount: "",
    status: "",
    created_at: "",
  });

  // Date pad helper
  const pad = (n) => (n < 10 ? "0" + n : n);

  useEffect(() => {
    fetchCustomers();

    const now = new Date();
    const formatted = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate()
    )}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    setForm((prev) => ({ ...prev, created_at: formatted }));
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await fetch("http://anayet.intelsofts.com/project_app/public/api/customers");
      if (!res.ok) throw new Error("Failed to fetch customers");
      const data = await res.json();
      setCustomers(data.customers);
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.customer_id || !form.total_amount) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch("http://anayet.intelsofts.com/project_app/public/api/sales", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const contentType = res.headers.get("content-type");
      if (!res.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to save sale");
        } else {
          throw new Error("Unexpected server error");
        }
      }

      alert("✅ Sale saved successfully!");
      navigate("/sales");
    } catch (error) {
      alert("❌ " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create New Sale</h2>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="customer_id">Customer</label>
          <select
            name="customer_id"
            value={form.customer_id}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="" disabled>Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="total_amount">Total Amount</label>
          <input
            type="number"
            step="0.01"
            name="total_amount"
            value={form.total_amount}
            onChange={handleChange}
            required
            placeholder="Enter total amount"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="discount">Discount</label>
          <input
            type="number"
            step="0.01"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            placeholder="Enter discount"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <input
            type="text"
            name="status"
            value={form.status}
            onChange={handleChange}
            placeholder="Enter status"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="created_at">Created At</label>
          <input
            type="datetime-local"
            name="created_at"
            value={form.created_at}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button type="submit" style={styles.button}>Save</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "50px auto",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
  },
  formGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
    backgroundColor: "#fafafa",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px 28px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "6px",
    transition: "0.3s ease",
    cursor: "pointer",
  },
};

export default CreateSale;
