import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    photo: null,
  });

  useEffect(() => {
    fetch(`${baseUrl}/customers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const c = data.data || data;
        setForm({
          name: c.name || "",
          mobile: c.mobile || "",
          email: c.email || "",
          address: c.address || "",
          photo: null,
        });
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("mobile", form.mobile);
    formData.append("email", form.email);
    formData.append("address", form.address);
    if (form.photo) {
      formData.append("photo", form.photo);
    }

    fetch(`${baseUrl}/customers/${id}`, {
      method: "POST", // Laravel uses POST with _method for PUT
      headers: {
        Accept: "application/json",
      },
      body: (() => {
        formData.append("_method", "PUT");
        return formData;
      })(),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Customer updated successfully!");
        navigate("/customers");
      })
      .catch((err) => console.error("Update error:", err));
  };

  return (
    <>
      <style>
        {`
        body {
          background-color: #f4f6f9;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .page-header {
          text-align: center;
          padding: 40px 20px 20px;
        }
        .page-header h1 {
          font-size: 32px;
          font-weight: 700;
          color: #333;
        }
        .form-wrapper {
          max-width: 1050px;
          margin: 0 auto;
          background: #fff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }
        .form-group {
          margin-bottom: 25px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #444;
        }
        .form-group input[type="text"],
        .form-group input[type="email"],
        .form-group textarea,
        .form-group input[type="file"] {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 15px;
          background-color: #fafafa;
        }
        .form-group textarea {
          resize: vertical;
          min-height: 90px;
        }
        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .btn-submit {
          background-color: #28a745;
          color: white;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: bold;
          border: none;
          border-radius: 6px;
          transition: 0.3s;
        }
        .btn-submit:hover {
          background-color: #218838;
        }
        `}
      </style>

      {/* Back button container aligned left with blue color */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          margin: "20px 0",
          maxWidth: "1050px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Link
          to="/customers"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 18px",
            fontSize: "14px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "600",
            boxShadow: "0 2px 6px rgba(0,123,255,0.4)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
        >
          ← Back
        </Link>
      </div>

      <div className="page-header">
        <h1>Edit Customer</h1>
      </div>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input name="name" type="text" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input name="mobile" type="text" value={form.mobile} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="photo">Photo</label>
            <input name="photo" type="file" accept="image/*" onChange={handleChange} />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCustomer;
