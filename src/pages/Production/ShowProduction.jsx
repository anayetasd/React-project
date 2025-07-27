import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const styles = {
  container: {
    maxWidth: 900,
    margin: '30px auto',
    background: '#fff',
    padding: 25,
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  cellLabel: {
    fontWeight: 'bold',
    width: '40%',
    backgroundColor: '#f0f0f0',
    padding: '12px 15px',
    border: '1px solid #ddd',
    color: '#333',
  },
  cellValue: {
    padding: '12px 15px',
    border: '1px solid #ddd',
    fontSize: 16,
    color: '#333',
  },
  rowStriped: {
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    margin: 20,
  },
};

const ProductionDetails = () => {
  const { id } = useParams();
  const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api';

  const [production, setProduction] = useState(null);
  const [products, setProducts] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, prodListRes, rawMatRes] = await Promise.all([
          fetch(`${baseUrl}/productions/${id}`, { headers: { Accept: 'application/json' } }),
          fetch(`${baseUrl}/products`, { headers: { Accept: 'application/json' } }),
          fetch(`${baseUrl}/rawmaterials`, { headers: { Accept: 'application/json' } }),
        ]);

        if (!prodRes.ok || !prodListRes.ok || !rawMatRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const prodData = await prodRes.json();
        const productListData = await prodListRes.json();
        const rawMaterialData = await rawMatRes.json();

        setProduction(prodData.production || null);
        setProducts(productListData.products || []);
        setRawMaterials(rawMaterialData.rawmaterials || []);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      }
    };

    fetchData();
  }, [id]);

  const getProductName = (productId) => {
    const product = products.find((p) => p.id == productId);
    return product ? product.name : 'Unknown Product';
  };

  const getRawMaterialName = (rawMaterialId) => {
    const rawMaterial = rawMaterials.find((r) => r.id == rawMaterialId);
    return rawMaterial ? rawMaterial.name : 'Unknown Raw Material';
  };

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  if (!production) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link className="btn btn-success" to="/productions" style={styles.backButton}>
        ← Back
      </Link>

      <div className="table-container" style={styles.container}>
        <table className="table-view" style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.cellLabel}>Production Date:</td>
              <td style={styles.cellValue}>{production.production_date}</td>
            </tr>

            <tr style={styles.rowStriped}>
              <td style={styles.cellLabel}>Product Name:</td>
              <td style={styles.cellValue}>{getProductName(production.product_id)}</td>
            </tr>

            <tr>
              <td style={styles.cellLabel}>Raw Material Used:</td>
              <td style={styles.cellValue}>{getRawMaterialName(production.raw_material_id)}</td>
            </tr>

            <tr style={styles.rowStriped}>
              <td style={styles.cellLabel}>Total Produced:</td>
              <td style={styles.cellValue}>{production.quantity_produced}</td>
            </tr>

            <tr>
              <td style={styles.cellLabel}>Unit:</td>
              <td style={styles.cellValue}>{production.unit}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductionDetails;
