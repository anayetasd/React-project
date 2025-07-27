import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

const DeleteProductConfirm = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${baseUrl}/products/${productId}`);
        const data = await res.json();
        setProduct(data.product ?? data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure?")) {
      try {
        const res = await fetch(`${baseUrl}/products/${productId}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error("Delete failed");

        navigate("/products");
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  if (!product) {
    return <div className="container">Loading product data...</div>;
  }

  return (
    <div style={styles.confirmContainer}>
      <Link to="/products" className="btn btn-success" style={styles.btnSuccess}>
        ← Back
      </Link>

      <p style={styles.message}>Are you sure you want to delete this product?</p>

      <h2 style={styles.heading}>Product Id: {product.id}</h2>
      <h2 style={styles.heading}>Product Name: {product.name}</h2>
      <h2 style={styles.heading}>Product Price: {product.regular_price}</h2>

      <form onSubmit={handleDelete}>
        <input
          type="submit"
          value="Confirm"
          className="btn btn-danger"
          style={styles.btnDanger}
        />
      </form>
    </div>
  );
};

const styles = {
  confirmContainer: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#fff3f3",
    border: "1px solid #f5c6cb",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: {
    color: "#dc3545",
    marginBottom: "20px",
    padding: "0 10px",
  },
  message: {
    fontSize: "18px",
    marginBottom: "30px",
    fontWeight: 600,
  },
  btnDanger: {
    padding: "10px 25px",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#dc3545",
    color: "white",
    cursor: "pointer",
  },
  btnSuccess: {
    marginBottom: "20px",
    display: "inline-block",
  },
};

export default DeleteProductConfirm;
