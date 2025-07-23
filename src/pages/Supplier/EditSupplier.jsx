import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    photo: null,
  });

  useEffect(() => {
    fetch(`${baseUrl}/suppliers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name,
          mobile: data.mobile,
          email: data.email,
          photo: null, // photo upload will be separate
        });
      })
      .catch((err) => console.error("Error loading supplier:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sendData = new FormData();
    sendData.append("name", formData.name);
    sendData.append("mobile", formData.mobile);
    sendData.append("email", formData.email);
    if (formData.photo) {
      sendData.append("photo", formData.photo);
    }

    fetch(`${baseUrl}/suppliers/${id}`, {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-HTTP-Method-Override": "PUT",
      },
      body: sendData,
    })
      .then((res) => res.json())
      .then(() => {
        alert("Supplier updated successfully!");
        navigate("/suppliers");
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Update failed!");
      });
  };

  return (
    <div style={styles.wrapper}>
      <Link to="/suppliers" className="btn btn-success" style={styles.backBtn}>
        ← Back to Suppliers
      </Link>

      <div style={styles.formContainer}>
        <h2 style={styles.title}>Edit Supplier</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div style={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              required
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              required
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Photo</label>
            <input type="file" name="photo" onChange={handleChange} />
          </div>

          <button type="submit" style={styles.submitBtn}>
            ✅ Update Supplier
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    maxWidth: "1100px",
    margin: "40px auto",
    padding: "0 20px",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#198754",
    fontWeight: "600",
  },
  formGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ced4da",
    borderRadius: "8px",
    fontSize: "15px",
  },
  submitBtn: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#198754",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  backBtn: {
    marginBottom: "20px",
    display: "inline-block",
  },
};

export default EditSupplier;
