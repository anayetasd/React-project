import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RawMaterialShow = () => {
  const { id } = useParams();
  const [rawMaterial, setRawMaterial] = useState(null);
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  useEffect(() => {
    fetch(`${baseUrl}/rawmaterials/${id}`)
      .then((res) => res.json())
      .then((data) => setRawMaterial(data))
      .catch((error) => console.error("Fetch error:", error));
  }, [id]);

  if (!rawMaterial) return <p>Loading...</p>;

  return (
    <div style={styles.pageWrapper}>
      <Link to="/rawmaterials" style={styles.backBtn}>← Back</Link>

      <div style={styles.detailContainer}>
        <h2 style={styles.title}>Raw Material Details</h2>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.labelCell}>Id</td>
              <td>{rawMaterial.id}</td>
            </tr>
            <tr>
              <td style={styles.labelCell}>Name</td>
              <td>{rawMaterial.name}</td>
            </tr>
            <tr>
              <td style={styles.labelCell}>Unit</td>
              <td>{rawMaterial.unit}</td>
            </tr>
            <tr>
              <td style={styles.labelCell}>Price per Unit</td>
              <td>{rawMaterial.price_per_unit}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    fontFamily: "'Segoe UI', sans-serif",
  },
  backBtn: {
    display: "inline-block",
    margin: "20px 0 10px 40px",
    textDecoration: "none",
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "15px",
  },
  detailContainer: {
    maxWidth: "950px",
    margin: "0 auto",
    background: "#ffffff",
    padding: "30px 40px",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#005792",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "16px",
  },
  labelCell: {
    fontWeight: "600",
    color: "#333",
    width: "35%",
    backgroundColor: "#f3f6f9",
    padding: "12px 15px",
  },
};

export default RawMaterialShow;
