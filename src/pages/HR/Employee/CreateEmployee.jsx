import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [form, setForm] = useState({
    name: "",
    employeeshift_id: "",
    employee_categorie_id: "",
    joining_date: "",
    photo: null,
    phone: "",
    address: "",
  });

  const [shifts, setShifts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/employeeshifts`)
      .then((res) => res.json())
      .then((data) => setShifts(data));

    fetch(`${baseUrl}/employeecategories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in form) {
      formData.append(key, form[key]);
    }

    try {
      const res = await fetch(`${baseUrl}/employees`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Employee created successfully!");
        navigate("/employees");
      } else {
        alert("Failed to create employee.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="form-container">
      <style>{`
        .form-container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 35px;
          background-color: #f9f9f9;
          border-radius: 15px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', sans-serif;
        }

        .form-container h2 {
          text-align: center;
          margin-bottom: 30px;
          color: #0d6efd;
          font-weight: 700;
          font-size: 28px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          font-weight: 600;
          display: block;
          margin-bottom: 8px;
          color: #212529;
        }

        .form-group input[type="text"],
        .form-group input[type="email"],
        .form-group input[type="file"],
        .form-group input[type="date"],
        .form-group input[type="number"],
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #ced4da;
          border-radius: 10px;
          font-size: 15px;
          background-color: #fff;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.1rem rgba(13, 110, 253, 0.25);
          outline: none;
        }

        .btn-submit {
          width: 100%;
          padding: 14px;
          font-size: 17px;
          background-color: #0d6efd;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }

        .btn-submit:hover {
          background-color: #0b5ed7;
        }
      `}</style>

      <h2>➕ Add New Employee</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={form.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="employeeshift_id">Shift</label>
          <select
            name="employeeshift_id"
            id="employeeshift_id"
            value={form.employeeshift_id}
            onChange={handleChange}
            required
          >
            <option value="">Select shift</option>
            {shifts.map((shift) => (
              <option key={shift.id} value={shift.id}>
                {shift.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="employee_categorie_id">Category</label>
          <select
            name="employee_categorie_id"
            id="employee_categorie_id"
            value={form.employee_categorie_id}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="joining_date">Joining Date</label>
          <input type="date" name="joining_date" id="joining_date" value={form.joining_date} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo</label>
          <input type="file" name="photo" id="photo" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="number" name="phone" id="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea name="address" id="address" value={form.address} onChange={handleChange} />
        </div>

        <button type="submit" className="btn-submit">
          Save Employee
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
