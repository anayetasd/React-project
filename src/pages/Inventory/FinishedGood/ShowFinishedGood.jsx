import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const FinishedGoodDetails = () => {
  const { id } = useParams();
  const [finishedGood, setFinishedGood] = useState(null);

  const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/';
  const endpoint = `finishedgoods/${id}`;

  useEffect(() => {
    const fetchFinishedGood = async () => {
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        const data = await response.json();
        setFinishedGood(data.finishedgood ?? data);
        console.log('Finished Good Fetched:', data);
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };

    fetchFinishedGood();
  }, [id]);

  const styles = {
    container: {
      maxWidth: '1150px',
      margin: '40px auto',
      background: '#ffffff',
      padding: '30px 40px',
      borderRadius: '15px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Segoe UI', sans-serif",
    },
    heading: {
      textAlign: 'center',
      marginBottom: '25px',
      color: '#0d6efd',
    },
    backButton: {
      display: 'inline-block',
      marginBottom: '20px',
      color: 'white',
      background: '#28a745',
      padding: '10px 20px',
      borderRadius: '6px',
      textDecoration: 'none',
      transition: '0.3s',
    },
    backButtonHover: {
      background: '#218838',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      background: 'white',
    },
    td: {
      padding: '12px 15px',
      border: '1px solid #ddd',
      fontSize: '15px',
      color: '#333',
    },
    tdFirst: {
      fontWeight: 'bold',
      backgroundColor: '#f8f9fa',
      width: '40%',
    },
  };

  return (
    <div style={styles.container}>
      <Link to="/finishedGoods" style={styles.backButton}>
        ← Back to Finished Goods
      </Link>

      <h2 style={styles.heading}>Finished Good Details</h2>

      {finishedGood && (
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.tdFirst}>ID</td>
              <td style={styles.td}>{finishedGood.id}</td>
            </tr>
            <tr>
              <td style={styles.tdFirst}>Product Name</td>
              <td style={styles.td}>{finishedGood.product_name}</td>
            </tr>
            <tr>
              <td style={styles.tdFirst}>Quantity</td>
              <td style={styles.td}>{finishedGood.quantity}</td>
            </tr>
            <tr>
              <td style={styles.tdFirst}>Price</td>
              <td style={styles.td}>{finishedGood.price}</td>
            </tr>
            <tr>
              <td style={styles.tdFirst}>Order Date</td>
              <td style={styles.td}>{finishedGood.order_date}</td>
            </tr>
            <tr>
              <td style={styles.tdFirst}>Status</td>
              <td style={styles.td}>{finishedGood.finished_good_status}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FinishedGoodDetails;
