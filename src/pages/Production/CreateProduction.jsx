import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProduction = () => {
  const navigate = useNavigate();
  const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/';

  const [production, setProduction] = useState({
    production_date: '',
    product_id: '',
    raw_material_id: '',
    raw_material_qty: '',
    unit: '',
    quantity_produced: ''
  });

  const [products, setProducts] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch(`${baseUrl}products`, { headers: { Accept: 'application/json' } }),
          fetch(`${baseUrl}rawmaterials`, { headers: { Accept: 'application/json' } })
        ]);

        const data1 = await res1.json();
        const data2 = await res2.json();

        setProducts(data1.products || []);
        setRawMaterials(data2.rawmaterials || []);
      } catch (err) {
        console.error('Data fetch failed:', err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setProduction({ ...production, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(production).forEach(([key, val]) => {
      formData.append(key, val);
    });

    try {
      const res = await fetch(`${baseUrl}productions`, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      });

      const result = await res.json();

      if (res.ok) {
        alert('Production Created!');
        navigate('/productions');
      } else {
        alert('Failed to save: ' + result.message);
      }
    } catch (err) {
      console.error('Save failed:', err);
      alert('Save failed.');
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Production</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="production_date">Production Date</label>
          <input
            type="date"
            id="production_date"
            value={production.production_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="product_id">Product Name</label>
          <select
            id="product_id"
            value={production.product_id}
            onChange={handleChange}
          >
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="raw_material_id">Raw Material Used</label>
          <select
            id="raw_material_id"
            value={production.raw_material_id}
            onChange={handleChange}
          >
            <option value="">Select raw material</option>
            {rawMaterials.map(material => (
              <option key={material.id} value={material.id}>
                {material.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="raw_material_qty">Raw Material Qty</label>
          <input
            type="number"
            id="raw_material_qty"
            value={production.raw_material_qty}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="unit">Wastage Unit</label>
          <input
            type="text"
            id="unit"
            value={production.unit}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity_produced">Total Produced</label>
          <input
            type="number"
            id="quantity_produced"
            value={production.quantity_produced}
            onChange={handleChange}
          />
        </div>

        <div className="form-submit">
          <input type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
};

export default CreateProduction;
