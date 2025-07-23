import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditSale = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [form, setForm] = useState({
    customer_id: "",
    total_amount: "",
    discount: "",
    status: "",
    created_at: "",
  });

  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch sale and customers simultaneously
    Promise.all([
      fetch(`${baseUrl}/sales/${id}`).then((res) => res.json()),
      fetch(`${baseUrl}/customers`).then((res) => res.json()),
    ])
      .then(([saleData, customersData]) => {
        // Adjust according to your actual API response structure:
        // Some APIs wrap data in `data` field, others return array/object directly
        const sale = saleData.data ?? saleData; // If data wrapped in .data else use as is
        const custs = customersData.data ?? customersData;

        setForm({
          customer_id: sale.customer_id || "",
          total_amount: sale.total_amount || "",
          discount: sale.discount || "",
          status: sale.status || "",
          created_at: sale.created_at || "",
        });

        if (Array.isArray(custs)) {
          setCustomers(custs);
        } else {
          console.error("Customers API response is not an array", custs);
          setCustomers([]); // fallback empty array
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
        setCustomers([]);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value || "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${baseUrl}/sales/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/sales");
        } else {
          alert("Failed to update sale");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("An error occurred while updating.");
      });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>
        Loading...
      </div>
    );
  }

  return (
    <div
      className="edit-container"
      style={{
        maxWidth: "1000px",
        margin: "50px auto",
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Link
        to="/sales"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          backgroundColor: "#28a745",
          color: "white",
          padding: "10px 20px",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "600",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
      >
        Back
      </Link>

      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "28px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Edit Sale
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#555" }}
          >
            Customer
          </label>
          <select
            name="customer_id"
            value={form.customer_id}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "15px",
              backgroundColor: "#fafafa",
            }}
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#555" }}
          >
            Total Amount
          </label>
          <input
            type="text"
            name="total_amount"
            value={form.total_amount}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "15px",
              backgroundColor: "#fafafa",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#555" }}
          >
            Discount
          </label>
          <input
            type="text"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "15px",
              backgroundColor: "#fafafa",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#555" }}
          >
            Status
          </label>
          <input
            type="text"
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "15px",
              backgroundColor: "#fafafa",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#555" }}
          >
            Created At
          </label>
          <input
            type="text"
            name="created_at"
            value={form.created_at}
            readOnly
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "15px",
              backgroundColor: "#e9ecef",
            }}
          />
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "12px 28px",
              fontSize: "16px",
              fontWeight: "600",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSale;
