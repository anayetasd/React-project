import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EditPurchase = () => {
  const { id: purchaseId } = useParams();
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [purchase, setPurchase] = useState({
    supplier_id: '',
    purchase_date: '',
    shipping_address: '',
    purchase_total: '',
    paid_amount: '',
    discount: '',
  });

  const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/';

  // Fetch suppliers
  const fetchSuppliers = async () => {
    try {
      const res = await fetch(`${baseUrl}suppliers`);
      const data = await res.json();
      setSuppliers(data.suppliers ?? data);
    } catch (err) {
      console.error('Failed to load suppliers:', err);
    }
  };

  // Fetch purchase by ID
  const fetchPurchase = async () => {
    try {
      const res = await fetch(`${baseUrl}purchases/${purchaseId}`);
      const data = await res.json();

      const p = data.purchase ?? data;

      // Format purchase_date (take only YYYY-MM-DD)
      if (p.purchase_date) {
        p.purchase_date = p.purchase_date.substring(0, 10);
      }
      setPurchase(p);
      console.log('Loaded purchase:', p);
    } catch (err) {
      console.error('Failed to load purchase:', err);
    }
  };

  useEffect(() => {
    fetchSuppliers();
    fetchPurchase();
  }, [purchaseId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPurchase((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update purchase on submit
  const updatePurchase = async (e) => {
    e.preventDefault();
    try {
      // Prepare data with proper types
      const payload = {
        ...purchase,
        purchase_total: parseFloat(purchase.purchase_total) || 0,
        paid_amount: parseFloat(purchase.paid_amount) || 0,
        discount: parseFloat(purchase.discount) || 0,
      };

      const res = await fetch(`${baseUrl}purchases/${purchaseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('HTTP status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);

      if (data.message && data.message.toLowerCase().includes('success')) {
        alert('Purchase updated successfully!');
        navigate('/purchases');
      } else {
        alert(`Update failed. Server message: ${data.message || JSON.stringify(data)}`);
      }
    } catch (err) {
      alert('API error.');
      console.error(err);
    }
  };

  return (
    <div style={styles.formContainer}>
      <Link to="/purchases" style={styles.btnBack}>
        ← Back to Purchases
      </Link>

      <h2 style={styles.heading}>Edit Purchase</h2>
      <form onSubmit={updatePurchase}>
        <div style={styles.formGroup}>
          <label htmlFor="supplier_id" style={styles.label}>
            Supplier
          </label>
          <select
            id="supplier_id"
            name="supplier_id"
            value={purchase.supplier_id}
            onChange={handleChange}
            required
            style={styles.inputSelect}
          >
            <option value="" disabled>
              Select a supplier
            </option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="purchase_date" style={styles.label}>
            Purchase Date
          </label>
          <input
            type="date"
            id="purchase_date"
            name="purchase_date"
            value={purchase.purchase_date}
            onChange={handleChange}
            required
            style={styles.inputSelect}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="shipping_address" style={styles.label}>
            Shipping Address
          </label>
          <input
            type="text"
            id="shipping_address"
            name="shipping_address"
            value={purchase.shipping_address}
            onChange={handleChange}
            required
            style={styles.inputSelect}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="purchase_total" style={styles.label}>
            Purchase Total
          </label>
          <input
            type="number"
            step="0.01"
            id="purchase_total"
            name="purchase_total"
            value={purchase.purchase_total}
            onChange={handleChange}
            required
            style={styles.inputSelect}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="paid_amount" style={styles.label}>
            Paid Amount
          </label>
          <input
            type="number"
            step="0.01"
            id="paid_amount"
            name="paid_amount"
            value={purchase.paid_amount}
            onChange={handleChange}
            required
            style={styles.inputSelect}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="discount" style={styles.label}>
            Discount
          </label>
          <input
            type="number"
            step="0.01"
            id="discount"
            name="discount"
            value={purchase.discount}
            onChange={handleChange}
            style={styles.inputSelect}
          />
        </div>

        <button type="submit" style={styles.btnSubmit}>
          Update Purchase
        </button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    maxWidth: '1100px',
    margin: '30px auto',
    padding: '25px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  heading: {
    marginBottom: '25px',
    textAlign: 'center',
    color: '#28a745',
  },
  formGroup: {
    marginBottom: '18px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '6px',
    display: 'block',
    color: '#333',
  },
  inputSelect: {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #ced4da',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#fff',
    transition: 'border 0.2s ease',
    outline: 'none',
  },
  btnSubmit: {
    width: '20%',
    padding: '12px',
    backgroundColor: '#28a745',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  btnBack: {
    display: 'inline-block',
    marginBottom: '20px',
    backgroundColor: 'rgb(20, 151, 59)',
    color: 'white',
    padding: '8px 14px',
    borderRadius: '6px',
    textDecoration: 'none',
  },
};

export default EditPurchase;
