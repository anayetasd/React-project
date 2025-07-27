import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const EditSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/';

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    photo: null,
  });

  useEffect(() => {
    fetchSupplier();
  }, []);

  const fetchSupplier = async () => {
    try {
      const res = await fetch(`${baseUrl}suppliers/${id}`);
      const data = await res.json();
      const supplier = data.supplier ?? data;
      setForm({
        name: supplier.name,
        mobile: supplier.mobile,
        email: supplier.email,
        photo: null,
      });
    } catch (err) {
      console.error('❌ Failed to load supplier:', err);
      alert('Failed to load supplier data.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    setForm((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('mobile', form.mobile);
    formData.append('email', form.email);
    formData.append('_method', 'PUT');

    if (form.photo) {
      formData.append('photo', form.photo);
    }

    try {
      const res = await fetch(`${baseUrl}suppliers/${id}`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        alert('❌ Update failed: ' + JSON.stringify(err));
        return;
      }

      alert('✅ Supplier updated successfully!');
      navigate('/suppliers');
    } catch (err) {
      console.error('❌ Error updating supplier:', err);
      alert('Failed to update supplier.');
    }
  };

  return (
    <div>
      <Link className="btn btn-success btn-back" to="/suppliers">
        ← Back to Suppliers
      </Link>

      <div className="form-container">
        <h2>Edit Supplier</h2>
        <form onSubmit={submitForm} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              id="name"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              name="mobile"
              type="text"
              id="mobile"
              value={form.mobile}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              id="email"
              value={form.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="photo">Photo</label>
            <input
              type="file"
              id="photo"
              onChange={handleFileUpload}
            />
          </div>

          <button type="submit" className="btn-submit">
            ✅ Update Supplier
          </button>
        </form>
      </div>

      <style>{`
        .form-container {
          max-width: 1150px;
          margin: 40px auto;
          padding: 30px;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        }

        .form-container h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #198754;
          font-weight: 600;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          font-weight: 500;
          display: block;
          margin-bottom: 8px;
          color: #333;
        }

        .form-group input[type="text"],
        .form-group input[type="email"],
        .form-group input[type="file"] {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ced4da;
          border-radius: 8px;
          font-size: 15px;
          transition: border-color 0.3s;
        }

        .form-group input:focus {
          border-color: #198754;
          outline: none;
        }

        .btn-submit {
          width: 20%;
          padding: 12px;
          font-size: 16px;
          background-color: #198754;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s;
        }

        .btn-submit:hover {
          background-color: #157347;
        }

        .btn-back {
          margin: 20px auto 0;
          display: block;
          width: fit-content;
        }
      `}</style>
    </div>
  );
};

export default EditSupplier;
