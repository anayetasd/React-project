import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCustomer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: '',
    name: '',
    mobile: '',
    email: '',
    address: '',
    photo: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    try {
      const res = await fetch('http://anayet.intelsofts.com/project_app/public/api/customers', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.msg === 'Success') {
        alert('Customer Created');
        navigate('/customers');
      } else {
        alert('Error: ' + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to create customer');
    }
  };

  return (
    <div className="create-container">
      <h2>Create New Customer</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="id">Customer ID</label>
          <input type="text" name="id" value={form.id} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input type="text" name="mobile" value={form.mobile} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea name="address" value={form.address} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="photo">Photo</label>
          <input type="file" name="photo" onChange={handleChange} />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCustomer;
