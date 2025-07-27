import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://anayet.intelsofts.com/project_app/public/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((err) => {
        console.error("Error fetching product data:", err);
      });
  }, []);

  return (
    <div className="container mt-5 bg-white p-4 rounded shadow">
      <Link to="/products/create" className="btn btn-info fw-bold mb-3">
        ➕ New Product
      </Link>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="text-white text-center" style={{ backgroundColor: "#0d6efd" }}>
            <tr>
              <th>Id</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Regular Price</th>
              <th>Offer Price</th>
              <th>Barcode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr className="text-center" key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <img
                      src={`http://anayet.intelsofts.com/project_app/public/uploads/products/${product.photo}`}
                      alt={product.name}
                      width="80"
                      height="80"
                      style={{ borderRadius: "8px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td className="text-danger fw-bold">{product.regular_price}</td>
                  <td className="text-success fw-bold">{product.offer_price}</td>
                  <td>{product.barcode}</td>
                  <td>
                    <div className="btn-group">
                      <Link to={`/products/${product.id}/edit`} className="btn btn-sm btn-primary">
                        Edit
                      </Link>
                      <Link to={`/products/${product.id}`} className="btn btn-sm btn-success">
                        View
                      </Link>
                      <Link to={`/products/${product.id}/confirm`} className="btn btn-sm btn-danger">
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-3">
                  🚫 No Product Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
