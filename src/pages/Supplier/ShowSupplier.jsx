import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SupplierDetails = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  useEffect(() => {
    fetch(`${baseUrl}/suppliers/${id}`)
      .then((res) => res.json())
      .then((data) => setSupplier(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  if (!supplier) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <Link to="/suppliers" className="btn btn-success mb-3">
        ← Back to Suppliers
      </Link>
      <h2 style={styles.heading}>Supplier Details</h2>

      <table style={styles.table}>
        <tbody>
          <tr>
            <td style={styles.label}>Id</td>
            <td>{supplier.id}</td>
          </tr>
          <tr>
            <td style={styles.label}>Name</td>
            <td>{supplier.name}</td>
          </tr>
          <tr>
            <td style={styles.label}>Mobile</td>
            <td>{supplier.mobile}</td>
          </tr>
          <tr>
            <td style={styles.label}>Email</td>
            <td>{supplier.email}</td>
          </tr>
          <tr>
            <td style={styles.label}>Photo</td>
            <td>
              <img
                src={`http://anayet.intelsofts.com/project_app/public/img/${supplier.photo}`}
                width="120"
                alt="Supplier"
                style={styles.image}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1150px",
    margin: "40px auto",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontWeight: "600",
    color: "#0d6efd",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  label: {
    fontWeight: "600",
    backgroundColor: "#f8f9fa",
    width: "30%",
    padding: "12px 15px",
    borderBottom: "1px solid #e0e0e0",
  },
  image: {
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default SupplierDetails;
