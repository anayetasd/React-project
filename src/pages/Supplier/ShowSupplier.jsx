// SupplierDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const SupplierDetails = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await fetch(`http://anayet.intelsofts.com/project_app/public/api/suppliers/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        const data = await response.json();
        setSupplier(data.supplier);
      } catch (err) {
        console.error('Fetch Error:', err);
        alert('❌ Could not fetch supplier.');
      }
    };

    fetchSupplier();
  }, [id]);

  return (
    <div className="view-container">
      <Link to="/suppliers" className="btn btn-success btn-back">← Back to Suppliers</Link>
      <h2>Supplier Details</h2>

      {supplier ? (
        <table className="table-custom">
          <tbody>
            <tr>
              <td>Id</td>
              <td>{supplier.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{supplier.name}</td>
            </tr>
            <tr>
              <td>Mobile</td>
              <td>{supplier.mobile}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{supplier.email}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading supplier details...</p>
      )}
    </div>
  );
};

export default SupplierDetails;

// CSS styles (inline or you can move them to an external .css file)
const style = document.createElement('style');
style.textContent = `
.view-container {
  max-width: 1150px;
  margin: 40px auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.view-container h2 {
  text-align: center;
  margin-bottom: 25px;
  font-weight: 600;
  color: #0d6efd;
}

.table-custom {
  width: 100%;
  border-collapse: collapse;
}

.table-custom td {
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
}

.table-custom td:first-child {
  font-weight: 600;
  background-color: #f8f9fa;
  width: 30%;
}

.supplier-photo {
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.btn-back {
  margin-bottom: 20px;
  display: inline-block;
}
`;
document.head.appendChild(style);
