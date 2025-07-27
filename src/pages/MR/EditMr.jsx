import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditMoneyReceipt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customer_id: "",
    receipt_total: "",
    discount: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mrRes, customerRes] = await Promise.all([
          fetch(`${baseUrl}/mrs/${id}`),
          fetch(`${baseUrl}/customers`),
        ]);

        const mrData = await mrRes.json();
        const customerData = await customerRes.json();

        setForm({
          customer_id: mrData.mr.customer_id,
          receipt_total: mrData.mr.receipt_total,
          discount: mrData.mr.discount,
        });

        setCustomers(customerData.customers ?? customerData);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateReceipt = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/mrs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Money Receipt updated successfully!");
        navigate("/mrs");
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <Link to="/mrs" style={styles.backButton}>
        ← Back to Money Receipt
      </Link>

      <h2 style={styles.title}>Edit Money Receipt</h2>

      <form onSubmit={updateReceipt}>
        <div style={styles.formGroup}>
          <label htmlFor="customer_id">Customer</label>
          <select
            id="customer_id"
            name="customer_id"
            value={form.customer_id}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="receipt_total">Receipt Total</label>
          <input
            type="number"
            id="receipt_total"
            name="receipt_total"
            value={form.receipt_total}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="discount">Discount</label>
          <input
            type="number"
            step="0.01"
            id="discount"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitButton}>
          Update Money Receipt
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: "25px",
    textAlign: "center",
    color: "#28a745",
    fontSize: "28px",
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    backgroundColor: "#f9f9f9",
    transition: "border 0.2s ease",
  },
  submitButton: {
    width: "20%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  backButton: {
    display: "inline-block",
    marginBottom: "20px",
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default EditMoneyReceipt;
