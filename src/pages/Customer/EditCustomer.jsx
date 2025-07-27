import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditCustomer = () => {
  const { id } = useParams();
  const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/customers/${id}`;

  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    email: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch customer data on mount
  useEffect(() => {
    async function fetchCustomer() {
      try {
        const res = await fetch(baseUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setCustomer(data);
        } else {
          setMessage("Failed to load customer data");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setMessage("Error loading customer data");
      }
    }

    fetchCustomer();
  }, [baseUrl]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const submitCustomer = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", customer.name);
  formData.append("mobile", customer.mobile);
  formData.append("email", customer.email);
  formData.append("_method", "PUT");
  if (file) formData.append("photo", file);

  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const result = await res.json();
      setMessage(result.message || "Update successful");
      setTimeout(() => {
        navigate("/customers");
      }, 1500); 
    } else {
      setMessage("Failed to update customer");
    }
  } catch (error) {
    setMessage("Upload failed: " + error.message);
  }
};



  return (
    <div style={styles.formContainer}>
      <h1 style={styles.heading}>Edit Customer</h1>
      <Link to="/customers" style={styles.btnBack}>
        ← Back
      </Link>

      {message && <p style={styles.message}>{message}</p>}

      <form onSubmit={submitCustomer} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={customer.mobile}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.btnSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    width: "1100px",
    margin: "40px auto",
    padding: "30px 40px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  },
  heading: {
    textAlign: "center",
    color: "#0d6efd",
    marginBottom: "25px",
  },
  btnBack: {
    display: "inline-block",
    marginBottom: "20px",
    color: "#1c5d96ff",
    textDecoration: "none",
    fontWeight: 600,
    transition: "color 0.3s ease",
  },
  message: {
    margin: "15px 0",
    padding: "10px",
    backgroundColor: "#e7f3ff",
    border: "1px solid #b6d4fe",
    color: "#3178c6",
    borderRadius: "6px",
    fontWeight: 600,
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px 12px",
    border: "1.5px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    transition: "border-color 0.3s ease",
  },
  btnSubmit: {
    backgroundColor: "#0d6efd",
    color: "white",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "700",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    width: "20%",
  },
};

export default EditCustomer;
