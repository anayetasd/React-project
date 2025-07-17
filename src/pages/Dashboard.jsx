import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalPurchases: 0,
    totalSales: 0,
    totalStocks: 0,
    totalSuppliers: 0
  });

  const [latestPurchases, setLatestPurchases] = useState([]);
  const [latestSales, setLatestSales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [lowStocks, setLowStocks] = useState([]);
  const [dueCustomers, setDueCustomers] = useState([]);

  useEffect(() => {
    fetch('http://anayet.intelsofts.com/project_app/public/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setSummary(data.summary);
        setLatestPurchases(data.latestPurchases);
        setLatestSales(data.latestSales);
        setTopProducts(data.topProducts);
        setLowStocks(data.lowStocks);
        setDueCustomers(data.dueCustomers);
      });
  }, []);

  return (
    <div className="container-fluid dashboard-container p-5 bg-light">
      <h2 className="text-center mb-5">🏭 Rice Mills Management Dashboard</h2>

      <div className="row g-4">
        {[
          { title: 'Total Purchases', value: summary.totalPurchases },
          { title: 'Total Sales', value: summary.totalSales },
          { title: 'Total Stocks', value: summary.totalStocks },
          { title: 'Suppliers', value: summary.totalSuppliers }
        ].map((item, idx) => (
          <div className="col-md-3" key={idx}>
            <div className="dashboard-card text-center p-4 shadow rounded">
              <div className="card-title fw-semibold">{item.title}</div>
              <div className="card-value fs-2 text-primary fw-bold">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mt-5">
        <div className="col-md-6">
          <div className="dashboard-card p-4 shadow rounded">
            <h5 className="section-heading">🛒 Latest Purchases</h5>
            <table className="table table-sm table-striped">
              <thead><tr><th>Date</th><th>Supplier</th><th>Amount</th></tr></thead>
              <tbody>
                {latestPurchases.length ? latestPurchases.map((p, i) => (
                  <tr key={i}>
                    <td>{p.purchase_date}</td>
                    <td>{p.supplier.name}</td>
                    <td>{p.purchase_total.toLocaleString()}</td>
                  </tr>
                )) : (
                  <tr><td colSpan="3" className="text-center">No purchases</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6">
          <div className="dashboard-card p-4 shadow rounded">
            <h5 className="section-heading">📦 Latest Sales</h5>
            <table className="table table-sm table-striped">
              <thead><tr><th>Date</th><th>Customer</th><th>Amount</th></tr></thead>
              <tbody>
                {latestSales.length ? latestSales.map((s, i) => (
                  <tr key={i}>
                    <td>{s.sale_date}</td>
                    <td>{s.customer.name}</td>
                    <td>{s.sale_total.toLocaleString()}</td>
                  </tr>
                )) : (
                  <tr><td colSpan="3" className="text-center">No sales</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <div className="dashboard-card p-4 shadow rounded">
            <h5 className="section-heading">🌾 Top Selling Products</h5>
            <ul className="list-group">
              {topProducts.map((p, i) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                  {p.name}
                  <span className="badge bg-success rounded-pill">{p.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="dashboard-card p-4 shadow rounded">
            <h5 className="section-heading">⚠️ Low Stock Alerts</h5>
            <ul className="list-group">
              {lowStocks.map((s, i) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                  {s.name}
                  <span className="badge bg-danger rounded-pill">{s.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-12">
          <div className="dashboard-card p-4 shadow rounded">
            <h5 className="section-heading">💰 Customers With Due</h5>
            <table className="table table-striped">
              <thead><tr><th>Customer Name</th><th>Due Amount (৳)</th></tr></thead>
              <tbody>
                {dueCustomers.map((c, i) => (
                  <tr key={i}>
                    <td>{c.name}</td>
                    <td>{c.due.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="text-center text-muted mt-5 mb-3">
        <small>Rice Mills ERP Dashboard &copy; {new Date().getFullYear()}</small>
      </div>

      <footer className="footer bg-white py-3 mt-4 border-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              Copyright © 2018 Concept. All rights reserved. Dashboard by <a href="https://colorlib.com/wp/">Colorlib</a>.
            </div>
            <div className="col-md-6 text-md-end d-none d-sm-block">
              <a href="#" className="mx-2">About</a>
              <a href="#" className="mx-2">Support</a>
              <a href="#" className="mx-2">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;