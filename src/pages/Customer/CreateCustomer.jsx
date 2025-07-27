import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CreateCustomer = () => {
  const navigate = useNavigate();
  const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/customers';

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  const submitCustomer = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('mobile', form.mobile);
    formData.append('email', form.email);
    formData.append('address', form.address);
    formData.append('photo', file);

    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || 'Customer saved successfully!');
        setTimeout(() => navigate('/customers'), 1000);
      } else {
        alert(result.message || 'Something went wrong!');
      }
    } catch (error) {
      alert('Upload failed: ' + error.message);
    }
  };

  return (
    <div style={styles.formContainer}>
      <h1 style={styles.heading}>Create Customer</h1>
      <Link to="/customers" style={styles.backBtn}>← Back</Link>

      {message && <p style={styles.message}>{message}</p>}

      <form onSubmit={submitCustomer} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            required
            style={styles.input}
          />
        </div>

        {preview && (
          <div style={styles.imagePreview}>
            <img src={preview} alt="Preview" style={styles.image} />
          </div>
        )}

        <div style={styles.formGroup}>
          <button type="submit" style={styles.submitBtn}>Submit</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    width: '1150px',
    margin: '40px auto',
    padding: '30px 40px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  },
  heading: {
    color: '#0d6efd',
    marginBottom: '25px',
    textAlign: 'center',
  },
  backBtn: {
    display: 'inline-block',
    marginBottom: '20px',
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    textDecoration: 'none',
  },
  message: {
    marginBottom: '15px',
    padding: '12px 15px',
    backgroundColor: '#d1e7dd',
    color: '#0f5132',
    borderRadius: '6px',
    textAlign: 'center',
    fontWeight: '600',
    border: '1px solid #badbcc',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px 12px',
    border: '1.5px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px',
  },
  submitBtn: {
    backgroundColor: '#0d6efd',
    color: 'white',
    padding: '12px 0',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  imagePreview: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  image: {
    maxWidth: '150px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
};

export default CreateCustomer;
