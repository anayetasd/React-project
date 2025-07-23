import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateEmployeeSalary = () => {
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
    fetch(`${baseUrl}/employee-administrators`)
      .then((res) => res.json())
      .then((data) => setAdministrators(data));

    fetch(`${baseUrl}/payment-methods`)
      .then((res) => res.json())
      .then((data) => setPayments(data));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${baseUrl}/employeesalarys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    navigate("/employee-salary");
  };

  return (
    <div className="form-container">
      <h2>New Employee Salary</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="payment_date">Payment Date</label>
            <input type="date" name="payment_date" value={form.payment_date} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="employee_administrator_id">Administrator</label>
            <select name="employee_administrator_id" value={form.employee_administrator_id} onChange={handleChange}>
              <option value="">Select Administrator</option>
              {administrators.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.role}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="payment_method_id">Payment Method</label>
            <select name="payment_method_id" value={form.payment_method_id} onChange={handleChange}>
              <option value="">Select Payment Method</option>
              {payments.map((payment) => (
                <option key={payment.id} value={payment.id}>
                  {payment.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="total_amount">Total Amount</label>
            <input type="text" name="total_amount" value={form.total_amount} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="paid_amount">Paid Amount</label>
            <input type="text" name="paid_amount" value={form.paid_amount} onChange={handleChange} />
          </div>

          <button type="submit" className="btn-submit">
            💾 Save Salary
          </button>
        </div>
      </form>

      {/* Include styles inline or move to a CSS file */}
      <style>{`
        .form-container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 40px;
          background-color: #ffffff;
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .form-container h2 {
          text-align: center;
          margin-bottom: 35px;
          color: #0d6efd;
          font-weight: 700;
          font-size: 28px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }

        .form-group input,
        .form-group select {
          padding: 12px 14px;
          border: 1px solid #ced4da;
          border-radius: 10px;
          font-size: 15px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.15);
          outline: none;
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
          text-align: center;
        }

        .btn-submit:hover {
          background-color: #157347;
        }
      `}</style>
    </div>
  );
};

export default CreateEmployeeSalary;
