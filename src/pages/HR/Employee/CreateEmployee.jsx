import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

const AddEmployee = () => {
  const navigate = useNavigate(); // ✅ initialize navigate

  const [form, setForm] = useState({
    name: "",
    employeeshift_id: "",
    employee_categorie_id: "",
    joining_date: "",
    phone: "",
    address: "",
  });

  const [photo, setPhoto] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [categories, setCategories] = useState([]);
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [shiftRes, categoryRes] = await Promise.all([
          fetch(`${baseUrl}/employeeshifts`),
          fetch(`${baseUrl}/employeecategories`),
        ]);
        const shiftData = await shiftRes.json();
        const categoryData = await categoryRes.json();
        setShifts(shiftData.shifts ?? shiftData);
        setCategories(categoryData.categories ?? categoryData);
      } catch (error) {
        console.error("Dropdown fetch error:", error);
      }
    };
    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const submitEmployee = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (photo) formData.append("photo", photo);

    try {
      const res = await fetch(`${baseUrl}/employees`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Employee added successfully!");
        setTimeout(() => {
          navigate("/employees"); // ✅ redirect using react-router
        }, 1000);
      } else {
        alert("❌ Error: " + JSON.stringify(data));
      }
    } catch (err) {
      alert("❌ Server error. Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Add New Employee</h2>
      <form onSubmit={submitEmployee} encType="multipart/form-data">
        <div style={styles.formGroup}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} type="text" required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label>Shift</label>
          <select name="employeeshift_id" value={form.employeeshift_id} onChange={handleChange} required style={styles.input}>
            <option value="">Select shift</option>
            {shifts.map((shift) => (
              <option key={shift.id} value={shift.id}>{shift.name}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label>Category</label>
          <select name="employee_categorie_id" value={form.employee_categorie_id} onChange={handleChange} required style={styles.input}>
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label>Joining Date</label>
          <input name="joining_date" value={form.joining_date} onChange={handleChange} type="date" required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label>Photo</label>
          <input type="file" onChange={handleFileChange} style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} type="text" required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label>Address</label>
          <textarea name="address" value={form.address} onChange={handleChange} style={{ ...styles.input, height: "80px" }} />
        </div>

        <button type="submit" style={styles.button}>💾 Save Employee</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    Width: "1100px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif"
  },
  header: {
    textAlign: "center",
    marginBottom: "20px"
  },
  formGroup: {
    marginBottom: "15px"
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px"
  }
};

export default AddEmployee;
