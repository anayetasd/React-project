import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewEmployeeSalary = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    // employee_id: "",
    payment_date: "",
    employee_administrator_id: "",
    payment_method_id: "",
    total_amount: "",
    paid_amount: "",
  });

  const [administrators, setAdministrators] = useState([]);
  const [payments, setPayments] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Fetch dropdown data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adminRes, paymentRes, empRes] = await Promise.all([
          fetch(
            "http://anayet.intelsofts.com/project_app/public/api/administrators"
          ),
          fetch(
            "http://anayet.intelsofts.com/project_app/public/api/paymentmethods"
          ),
          fetch("http://anayet.intelsofts.com/project_app/public/api/employees"),
        ]);

        const adminData = await adminRes.json();
        const paymentData = await paymentRes.json();
        const employeeData = await empRes.json();

        setAdministrators(adminData.data || adminData);
        setPayments(paymentData.data || paymentData);
        setEmployees(employeeData.employees || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching dropdown data.");
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const submitForm = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (
      !form.name ||
      !form.payment_date ||
      !form.employee_administrator_id ||
      !form.payment_method_id ||
      !form.total_amount ||
      !form.paid_amount
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        name: form.name,
        payment_date: form.payment_date,
        employee_administrator_id: form.employee_administrator_id,
        payment_method_id: form.payment_method_id,
        total_amount: Number(form.total_amount),
        paid_amount: Number(form.paid_amount),
      };

      const res = await fetch(
        "http://anayet.intelsofts.com/project_app/public/api/employeesalarys",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to save salary");
      }

      alert("✅ Employee Salary Saved Successfully!");
      navigate("/employeesalarys");
    } catch (error) {
      console.error("Submit error:", error);
      alert("❌ Error saving salary: " + error.message);
    }
  };

  return (
    <div className="form-container" style={styles.formContainer}>
      <h2 style={styles.heading}>New Employee Salary</h2>
      <form onSubmit={submitForm}>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          

          <div style={styles.formGroup}>
            <label htmlFor="payment_date" style={styles.label}>
              Payment Date
            </label>
            <input
              type="date"
              id="payment_date"
              name="payment_date"
              value={form.payment_date}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="employee_administrator_id" style={styles.label}>
              Administrator
            </label>
            <select
              id="employee_administrator_id"
              name="employee_administrator_id"
              value={form.employee_administrator_id}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">-- Select --</option>
              {administrators.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name || admin.role}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="payment_method_id" style={styles.label}>
              Payment Method
            </label>
            <select
              id="payment_method_id"
              name="payment_method_id"
              value={form.payment_method_id}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">-- Select --</option>
              {payments.map((payment) => (
                <option key={payment.id} value={payment.id}>
                  {payment.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="total_amount" style={styles.label}>
              Total Amount
            </label>
            <input
              type="number"
              id="total_amount"
              name="total_amount"
              value={form.total_amount}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="paid_amount" style={styles.label}>
              Paid Amount
            </label>
            <input
              type="number"
              id="paid_amount"
              name="paid_amount"
              value={form.paid_amount}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            💾 Save Salary
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    Width: "1000px",
    margin: "40px auto",
    padding: "30px 40px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#0d6efd",
    fontWeight: "700",
    fontSize: "28px",
    marginBottom: "30px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "25px 30px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "600",
    marginBottom: "8px",
    color: "#333",
    fontSize: "15px",
  },
  input: {
    padding: "10px 14px",
    fontSize: "15px",
    border: "1.5px solid #ced4da",
    borderRadius: "8px",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  select: {
    padding: "10px 14px",
    fontSize: "15px",
    border: "1.5px solid #ced4da",
    borderRadius: "8px",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  submitButton: {
    gridColumn: "1 / -1",
    padding: "14px",
    fontSize: "17px",
    fontWeight: "700",
    color: "#fff",
    backgroundColor: "#198754",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s ease",
    marginTop: "20px",
    width: "20%",
  },
};

export default NewEmployeeSalary;
