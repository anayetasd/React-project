import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";

const EditPurchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch suppliers and purchase data simultaneously
        const [supRes, purRes] = await Promise.all([
          fetch(`${baseUrl}/suppliers`),
          fetch(`${baseUrl}/purchases/${id}`)
        ]);

        const supData = await supRes.json();
        const purData = await purRes.json();

        // Handle API response structure: data might be wrapped in "data" key
        const suppliersList = Array.isArray(supData)
          ? supData
          : supData.data || [];

        const purchase = purData.data || purData;

        setSuppliers(suppliersList);

        setFormData({
          supplier_id: purchase.supplier_id ?? "",
          purchase_date: purchase.purchase_date ?? "",
          shipping_address: purchase.shipping_address ?? "",
          purchase_total: purchase.purchase_total ?? "",
          paid_amount: purchase.paid_amount ?? "",
          discount: purchase.discount ?? ""
        });

        setLoading(false);
      } catch (err) {
        alert("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseUrl}/purchases/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Purchase updated successfully!");
        navigate("/purchases");
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Update failed");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading || !formData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="form-container">
     <Link className="btn-back" to="/purchases">← Back to Purchases</Link>
      <h2>Edit Purchase</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="supplier_id">Supplier</label>
          <select
            name="supplier_id"
            value={formData.supplier_id}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="purchase_date">Purchase Date</label>
          <input
            type="date"
            name="purchase_date"
            value={formData.purchase_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shipping_address">Shipping Address</label>
          <input
            type="text"
            name="shipping_address"
            value={formData.shipping_address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="purchase_total">Purchase Total</label>
          <input
            type="number"
            step="0.01"
            name="purchase_total"
            value={formData.purchase_total}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="paid_amount">Paid Amount</label>
          <input
            type="number"
            step="0.01"
            name="paid_amount"
            value={formData.paid_amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="discount">Discount</label>
          <input
            type="number"
            step="0.01"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-submit">Update Purchase</button>
      </form>
    </div>
  );
};

export default EditPurchase;
