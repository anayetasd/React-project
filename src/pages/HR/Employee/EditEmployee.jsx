import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [form, setForm] = useState({
    name: "",
    joining_date: "",
    address: "",
    photo: null,
  });

  const [existingPhoto, setExistingPhoto] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/employees/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name || "",
          joining_date: data.joining_date || "",
          address: data.address || "",
          photo: null,
        });
        setExistingPhoto(data.photo || null);
      })
      .catch((err) => console.error("Error fetching employee:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("joining_date", form.joining_date);
    formData.append("address", form.address);
    if (form.photo) {
      formData.append("photo", form.photo);
    }

    try {
      const res = await fetch(`${baseUrl}/employees/${id}`, {
        method: "POST", // Laravel expects POST + _method=PUT
        body: formData,
      });
      formData.append("_method", "PUT");

      if (res.ok) {
        alert("Employee updated successfully!");
        navigate("/employees");
      } else {
        alert("Failed to update employee.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("An error occurred.");
    }
  };

  return (
    <>
      <style>{`
        .form-container {
          max-width: 1200px;
          margin: 40px auto;
          background: #ffffff;
          padding: 30px 40px;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0,0,0,0.08);
          font-family: 'Segoe UI', sans-serif;
        }

        .form-container h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #005792;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          font-weight: 600;
          display: block;
          margin-bottom: 8px;
          color: #333;
        }

        input[type="text"],
        input[type="date"],
        input[type="file"],
        textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        .btn-submit {
          background-color: #005792;
          color: white;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn-submit:hover {
          background-color: #003f66;
        }

        .btn-back {
          display: inline-block;
          margin: 20px auto 10px 40px;
          text-decoration: none;
          background-color: #28a745;
          color: white;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 15px;
        }

        .btn-back:hover {
          background-color: #218838;
        }

        .photo-preview {
          margin-top: 10px;
        }

        .photo-preview img {
          height: 60px;
          border-radius: 6px;
        }
      `}</style>

      <Link className="btn-back" to="/employees">← Back</Link>

      <div className="form-container">
        <h2>Edit Employee</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="joining_date">Joining Date</label>
            <input
              type="date"
              name="joining_date"
              id="joining_date"
              value={form.joining_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="photo">Photo</label>
            <input type="file" name="photo" id="photo" onChange={handleChange} />
            {existingPhoto && (
              <div className="photo-preview">
                <img src={`http://anayet.intelsofts.com/project_app/public/uploads/employees/${existingPhoto}`} alt="Current" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              id="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-submit">💾 Save Employee</button>
        </form>
      </div>
    </>
  );
};

export default EditEmployee;
