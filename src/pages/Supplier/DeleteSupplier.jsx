import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const DeleteSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/suppliers/${id}`)
      .then((res) => res.json())
      .then((data) => setSupplier(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  const handleDelete = (e) => {
    e.preventDefault();

    fetch(`${baseUrl}/suppliers/${id}`, {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-HTTP-Method-Override": "DELETE",
      },
    })
      .then((res) => res.json())
      .then(() => {
        alert("Supplier deleted successfully!");
        navigate("/suppliers");
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Failed to delete supplier.");
      });
  };

  if (!supplier) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div style={styles.container}>
      <p style={styles.text}>Are you sure you want to delete this supplier?</p>
      <h2 style={styles.name}>{supplier.name}</h2>

      <form onSubmit={handleDelete}>
        <div style={styles.btnGroup}>
          <input
            type="submit"
            value="Yes, Delete"
            style={{ ...styles.btn, ...styles.btnDanger }}
          />
          <Link to="/suppliers" style={{ ...styles.btn, ...styles.btnBack }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  text: {
    fontSize: "18px",
    marginBottom: "20px",
    color: "#6c757d",
  },
  name: {
    color: "#dc3545",
    marginBottom: "30px",
  },
  btnGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  btn: {
    padding: "10px 25px",
    fontSize: "16px",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
  },
  btnDanger: {
    backgroundColor: "#dc3545",
    color: "#fff",
  },
  btnBack: {
    backgroundColor: "#198754",
    color: "#fff",
  },
};

export default DeleteSupplier;
