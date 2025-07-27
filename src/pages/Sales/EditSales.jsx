import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SaleEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [sale, setSale] = useState({
    id: "",
    customer_id: "",
    total_amount: "",
    discount: "",
    status: "",
    created_at: "",
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchSale();
    fetchCustomers();
  }, []);

  const fetchSale = async () => {
    try {
      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/sales/${id}`);
      if (!res.ok) throw new Error("Failed to fetch sale");

      const data = await res.json();
      console.log("Sale API Response:", data);
      setSale(data.sale ?? data.sales ?? data);
    } catch (error) {
      alert(error.message);
      navigate("/sales");
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/customers`);
      if (!res.ok) throw new Error("Failed to fetch customers");

      const data = await res.json();
      setCustomers(data.customers ?? data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSale((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/sales/${sale.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sale),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update sale");
      }

      alert("Sale updated successfully");
      navigate("/sales");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const goBack = () => navigate("/sales");

  return (
    <div style={styles.container}>
      <button onClick={goBack} style={styles.backBtn}>Back</button>
      <h2 style={styles.title}>Edit Sale</h2>

      <form onSubmit={handleUpdate}>
        <div style={styles.formGroup}>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={sale.id}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="customer_id">Customer ID</label>
          <select
            id="customer_id"
            name="customer_id"
            value={sale.customer_id}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="total_amount">Total Amount</label>
          <input
            type="text"
            id="total_amount"
            name="total_amount"
            value={sale.total_amount}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="discount">Discount</label>
          <input
            type="text"
            id="discount"
            name="discount"
            value={sale.discount}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            value={sale.status}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="created_at">Created At</label>
          <textarea
            id="created_at"
            name="created_at"
            value={sale.created_at}
            onChange={handleChange}
            style={styles.input}
            rows={3}
          ></textarea>
        </div>

        <div style={styles.actions}>
          <button type="submit" style={styles.submitBtn}>Update</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "50px auto",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
  },
  backBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    marginBottom: "20px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
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
    resize: "vertical",
  },
  actions: {
    textAlign: "center",
    marginTop: "30px",
  },
  submitBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px 28px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default SaleEdit;
