import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditEmployeeSalary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [form, setForm] = useState({
    name: "",
    payment_date: "",
    employee_administrator_id: "",
    payment_method_id: "",
    total_amount: "",
    paid_amount: "",
  });

  const [administrators, setAdministrators] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch salary data
    fetch(`${baseUrl}/employeesalarys/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Salary data from API:", data);
        // API থেকে salary key হলো employeesalary, তাই সেটা ধরতে হবে
        const salaryData = data.employeesalary ?? data;
        setForm({
          name: salaryData.name || "",
          payment_date: salaryData.payment_date || "",
          employee_administrator_id: salaryData.employee_administrator_id || "",
          payment_method_id: salaryData.payment_method_id || "",
          total_amount: salaryData.total_amount || "",
          paid_amount: salaryData.paid_amount || "",
        });
      })
      .catch((err) => {
        console.error("Error fetching salary:", err);
        alert("Error loading salary data.");
      });

    // Fetch administrators — API URL ঠিক করো
    fetch(`${baseUrl}/administrators`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch administrators");
        return res.json();
      })
      .then((data) => {
        setAdministrators(data.data || data || []);
      })
      .catch((err) => {
        console.error("Error loading administrators:", err);
        setAdministrators([]); // খারাপ হলে খালি রাখবে
      });

    // Fetch payment methods
    fetch(`${baseUrl}/paymentmethods`)
      .then((res) => res.json())
      .then((data) => {
        setPayments(data.data || data || []);
      })
      .catch((err) => {
        console.error("Error loading payment methods:", err);
        setPayments([]);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${baseUrl}/employeesalarys/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) {
          alert("✅ Salary updated successfully!");
          navigate("/employeesalarys");
        } else {
          alert("❌ Failed to update salary.");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("❌ Error occurred during update.");
      });
  };

  return (
    <div className="form-container">
      <style>{`
        .form-container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 30px 40px;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', sans-serif;
        }
        .form-container h2 {
          text-align: center;
          margin-bottom: 30px;
          color: #198754;
          font-weight: bold;
        }
        .form-group {
          margin-bottom: 25px;
        }
        .form-group label {
          font-weight: 600;
          display: block;
          margin-bottom: 10px;
          color: #212529;
        }
        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px;
          border: 1px solid #ced4da;
          border-radius: 8px;
          font-size: 16px;
          background-color: #fefefe;
        }
        .form-group input:focus,
        .form-group select:focus {
          border-color: #198754;
          outline: none;
          background-color: #fff;
        }
        .btn-submit {
          display: block;
          width: 200px;
          margin: 0 auto;
          padding: 12px;
          font-size: 16px;
          background-color: #198754;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
        .btn-submit:hover {
          background-color: #157347;
        }
        .btn-back {
          display: inline-block;
          margin-bottom: 30px;
          background-color: #198754;
          color: white;
          font-weight: 600;
          padding: 8px 20px;
          border-radius: 8px;
          text-decoration: none;
        }
        .btn-back:hover {
          background-color: #157347;
          color: #fff;
        }
      `}</style>

      <Link className="btn-back" to="/employeesalarys">
        ← Back to Employee Salary
      </Link>

      <h2>Edit Employee Salary</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Employee Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="payment_date">Payment Date</label>
          <input
            type="date"
            id="payment_date"
            name="payment_date"
            value={form.payment_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="employee_administrator_id">Administrator</label>
          <select
            id="employee_administrator_id"
            name="employee_administrator_id"
            value={form.employee_administrator_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Administrator --</option>
            {administrators.map((admin) => (
              <option key={admin.id} value={admin.id}>
                {admin.role || admin.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="payment_method_id">Payment Method</label>
          <select
            id="payment_method_id"
            name="payment_method_id"
            value={form.payment_method_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Payment Method --</option>
            {payments.map((pay) => (
              <option key={pay.id} value={pay.id}>
                {pay.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="total_amount">Total Amount</label>
          <input
            type="number"
            id="total_amount"
            name="total_amount"
            value={form.total_amount}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="paid_amount">Paid Amount</label>
          <input
            type="number"
            id="paid_amount"
            name="paid_amount"
            value={form.paid_amount}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-submit">
          ✅ Update Salary
        </button>
      </form>
    </div>
  );
};

export default EditEmployeeSalary;
