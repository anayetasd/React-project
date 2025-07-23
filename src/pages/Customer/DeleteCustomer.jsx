import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const DeleteCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [customerName, setCustomerName] = React.useState("");

  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  // Fetch customer name for display
  React.useEffect(() => {
    fetch(`${baseUrl}/customers/${id}`)
      .then(res => res.json())
      .then(data => {
        const c = data.data || data;
        setCustomerName(c.name || "");
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = (e) => {
    e.preventDefault();
    setDeleting(true);
    setError(null);

    fetch(`${baseUrl}/customers/${id}`, {
      method: "POST", // Laravel expects POST with _method DELETE
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ _method: "DELETE" }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Delete failed");
        return res.json();
      })
      .then(() => {
        alert("Customer deleted successfully");
        navigate("/customers");
      })
      .catch(err => {
        setError(err.message);
        setDeleting(false);
      });
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <Link to="/customers" style={{ display: "inline-block", marginBottom: 20, backgroundColor: "#28a745", color: "white", padding: "8px 14px", borderRadius: 6, textDecoration: "none" }}>
        Back
      </Link>
      <p>Are you sure?</p>
      <h2 style={{ padding: "12px 0" }}>{customerName}</h2>

      <form onSubmit={handleDelete} style={{ padding: "12px 0" }}>
        <button type="submit" disabled={deleting} style={{
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: 6,
          cursor: deleting ? "not-allowed" : "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}>
          {deleting ? "Deleting..." : "Confirm"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default DeleteCustomer;
