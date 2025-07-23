import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditFinishedGood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [form, setForm] = useState({
    product_name: "",
    quantity: "",
    price: "",
    order_date: "",
    finished_good_status: "",
  });

  const [loading, setLoading] = useState(true);

  // Load finished good data by ID
  useEffect(() => {
    fetch(`${baseUrl}/finishedGoods/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setForm({
          product_name: data.product_name || "",
          quantity: data.quantity || "",
          price: data.price || "",
          order_date: data.order_date || "",
          finished_good_status: data.finished_good_status || "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${baseUrl}/finishedGoods/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update");
        return res.json();
      })
      .then(() => {
        alert("Finished Good updated successfully!");
        navigate("/finishedGoods");
      })
      .catch((error) => {
        console.error("Update error:", error);
        alert("Something went wrong during update.");
      });
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={styles.formWrapper}>
      <Link to="/finishedGoods" style={styles.btnBack}>← Back to Finished Goods</Link>

      <h2 style={styles.heading}>Edit Finished Good</h2>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="product_name" style={styles.label}>Product Name</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={form.product_name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="quantity" style={styles.label}>Quantity</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="price" style={styles.label}>Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="order_date" style={styles.label}>Order Date</label>
          <input
            type="text"
            id="order_date"
            name="order_date"
            value={form.order_date}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="finished_good_status" style={styles.label}>Status</label>
          <input
            type="text"
            id="finished_good_status"
            name="finished_good_status"
            value={form.finished_good_status}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <input type="submit" value="Update Finished Good" style={styles.submitBtn} />
      </form>
    </div>
  );
};

const styles = {
  formWrapper: {
    maxWidth: "1000px",
    margin: "40px auto",
    background: "#fff",
    padding: "30px 40px",
    borderRadius: "15px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#0d6efd",
  },
  btnBack: {
    display: "inline-block",
    marginBottom: "20px",
    color: "white",
    background: "#6c757d",
    padding: "10px 20px",
    borderRadius: "6px",
    textDecoration: "none",
    transition: "0.3s",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    fontWeight: "600",
    display: "block",
    marginBottom: "8px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
  },
  submitBtn: {
    backgroundColor: "#0d6efd",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
    width: "100%",
    marginTop: "15px",
  },
};

export default EditFinishedGood;
