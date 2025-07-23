import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const DeleteProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [product, setProduct] = useState(null);

  // Fetch product data
  useEffect(() => {
    fetch(`${baseUrl}/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.product); // adjust based on your API response shape
      })
      .catch(err => console.error("Failed to load product", err));
  }, [id]);

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        if (res.ok) {
          navigate("/products");
        } else {
          alert("Delete failed");
        }
      })
      .catch(err => console.error("Delete error", err));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="confirm-container" style={styles.container}>
      <Link to="/products" className="btn btn-success" style={styles.backBtn}>
        ← Back
      </Link>

      <p style={styles.text}>Are you sure you want to delete this product?</p>

      <h2 style={styles.title}>{product.name}</h2>

      <form onSubmit={handleDelete}>
        <input
          type="submit"
          value="Confirm"
          className="btn btn-danger"
          style={styles.deleteBtn}
        />
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#fff3f3",
    border: "1px solid #f5c6cb",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    color: "#dc3545",
    marginBottom: "20px",
  },
  text: {
    fontSize: "18px",
    marginBottom: "30px",
    fontWeight: "600",
  },
  deleteBtn: {
    padding: "10px 25px",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#dc3545",
    color: "#fff",
  },
  backBtn: {
    marginBottom: "20px",
    display: "inline-block",
    backgroundColor: "#198754",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "6px",
    textDecoration: "none",
  },
};

export default DeleteProduct;
