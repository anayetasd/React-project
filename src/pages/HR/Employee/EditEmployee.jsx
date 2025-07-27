import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [form, setForm] = useState({
    name: "",
    joining_date: "",
    address: "",
    photo: null,
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/employees/${id}`);
        if (!res.ok) throw new Error("Failed to fetch employee");
        const data = await res.json();
        const emp = data.employee ?? data;
        setEmployee(emp);
        setForm({
          name: emp.name ?? "",
          joining_date: emp.joining_date ?? "",
          address: emp.address ?? "",
          photo: null,
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load employee data.");
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("joining_date", form.joining_date);
      formData.append("address", form.address);
      if (form.photo) formData.append("photo", form.photo);

      const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/employees/${id}`, {
        method: "POST",
        headers: {
          "X-HTTP-Method-Override": "PUT",
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update");

      alert("Employee updated successfully");
      navigate("/employees");
    } catch (err) {
      console.error(err);
      alert("Error updating employee.");
    }
  };

  return (
    <>
      <Link to="/employees" style={styles.btnBack}>
        ← Back
      </Link>

      {employee && (
        <div style={styles.formContainer}>
          <h2 style={styles.heading}>Edit Employee</h2>
          <form onSubmit={updateEmployee}>
            <div style={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="joining_date">Joining Date</label>
              <input
                id="joining_date"
                name="joining_date"
                type="date"
                required
                value={form.joining_date}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="photo">Photo</label>
              <input
                id="photo"
                name="photo"
                type="file"
                onChange={handleFileChange}
                style={styles.input}
              />
              {employee.photo && (
                <div style={styles.photoPreview}>
                  <img
                    src={`http://anayet.intelsofts.com/project_app/public/uploads/employees/${employee.photo}`}
                    alt="Current"
                    style={styles.photoImage}
                  />
                </div>
              )}
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                style={{ ...styles.input, height: 100 }}
              />
            </div>

            <button type="submit" style={styles.btnSubmit}>
              💾 Save Employee
            </button>
          </form>
        </div>
      )}
    </>
  );
};

const styles = {
  formContainer: {
    maxWidth: 1200,
    margin: "40px auto",
    backgroundColor: "#ffffff",
    padding: "30px 40px",
    borderRadius: 12,
    boxShadow: "0 0 15px rgba(0,0,0,0.08)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: 25,
    color: "#005792",
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: 8,
    fontSize: 15,
  },
  btnSubmit: {
    backgroundColor: "#005792",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    cursor: "pointer",
    transition: "0.3s",
  },
  btnBack: {
    display: "inline-block",
    margin: "20px auto 10px 40px",
    textDecoration: "none",
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px 16px",
    borderRadius: 8,
    fontSize: 15,
  },
  photoPreview: {
    marginTop: 10,
  },
  photoImage: {
    height: 60,
    borderRadius: 6,
  },
};

export default EditEmployee;
