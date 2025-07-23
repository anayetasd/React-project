import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ShowProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  useEffect(() => {
    fetch(`${baseUrl}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product || data); // adjust based on API structure
      })
      .catch((err) => console.error("Failed to fetch product", err));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <Link to="/products" className="btn btn-success" style={{ marginBottom: "20px", display: "inline-block" }}>
        ← Back
      </Link>

      <h2 style={styles.heading}>Product Details</h2>

      <table style={styles.table}>
        <tbody>
          <tr>
            <td style={styles.label}>Id</td>
            <td>{product.id}</td>
          </tr>
          <tr>
            <td style={styles.label}>Name</td>
            <td>{product.name}</td>
          </tr>
          <tr>
            <td style={styles.label}>Photo</td>
            <td>
              <img
                src={`http://anayet.intelsofts.com/project_app/public/img/${product.photo}`}
                alt={product.name}
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
    maxWidth: "950px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #dee2e6",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#343a40",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  label: {
    fontWeight: "bold",
    color: "#495057",
    width: "30%",
    padding: "12px 16px",
    borderBottom: "1px solid #dee2e6",
    fontSize: "16px",
  },
  image: {
    maxWidth: "200px",
    height: "auto",
    borderRadius: "8px",
    border: "1px solid #ced4da",
  },
};

export default ShowProduct;
