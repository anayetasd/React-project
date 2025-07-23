import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const ProductionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";
  const [production, setProduction] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/productions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduction(data);
      })
      .catch((error) => {
        console.error("Error fetching production:", error);
      });
  }, [id]);

  if (!production) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <style>{`
        .btn-success {
          margin: 20px;
        }

        .table-container {
          max-width: 900px;
          margin: 30px auto;
          background: #fff;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .table-view {
          width: 100%;
          border-collapse: collapse;
        }

        .table-view td {
          padding: 12px 15px;
          border: 1px solid #ddd;
          font-size: 16px;
          color: #333;
        }

        .table-view tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .table-view tr:hover {
          background-color: #f1f1f1;
        }

        .table-view td:first-child {
          font-weight: bold;
          width: 40%;
          background-color: #f0f0f0;
        }
      `}</style>

      <Link to="/productions" className="btn btn-success">← Back</Link>

      <div className="table-container">
        <table className="table-view">
          <tbody>
            <tr>
              <td>Production Date:</td>
              <td>{production.production_date}</td>
            </tr>
            <tr>
              <td>Product Name:</td>
              <td>{production.product?.name || "no name"}</td>
            </tr>
            <tr>
              <td>Raw Material Used:</td>
              <td>{production.raw_material?.name || "no name"}</td>
            </tr>
            <tr>
              <td>Total Produced:</td>
              <td>{production.quantity_produced}</td>
            </tr>
            <tr>
              <td>Unit:</td>
              <td>{production.unit}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductionDetails;
