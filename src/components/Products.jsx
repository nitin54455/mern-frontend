import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    imgUrl: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const fetchProducts = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);
  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/products/${id}`;
      const result = await axios.delete(url);
      setError("User Deleted Successfully");
      fetchUsers();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products`;
      const result = await axios.post(url, form);
      setError("User added succesfully");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      ...form,
      productName: product.productName,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products/${editId}`;
      const result = await axios.patch(url, form);
      fetchProducts();
      setEditId();
      resetForm();
      setError("User information updated successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      ...form,
      productName: "",
      description: "",
      price: "",
      imgUrl: "",
    });
  };
  return (
    <div className="products-admin-container" style={{ maxWidth: 900, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem' }}>
      <h2 style={{ fontSize: '1.7rem', fontWeight: 700, color: '#4f46e5', marginBottom: '1.5rem', letterSpacing: 1 }}>Product Management</h2>
      {error && <div style={{ color: '#e11d48', marginBottom: '1rem', fontWeight: 500 }}>{error}</div>}
      <form ref={frmRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', background: '#f9fafb', borderRadius: 10, padding: '1rem' }}>
        <input name="productName" value={form.productName} type="text" placeholder="Product Name" onChange={handleChange} required style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e5e7eb' }} />
        <input name="description" value={form.description} type="text" placeholder="Description" onChange={handleChange} required style={{ flex: 2, padding: '0.5rem', borderRadius: 6, border: '1px solid #e5e7eb' }} />
        <input name="price" value={form.price} type="text" placeholder="Price" onChange={handleChange} required style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e5e7eb' }} />
        <input name="imgUrl" value={form.imgUrl} type="text" placeholder="Image Url" onChange={handleChange} required style={{ flex: 2, padding: '0.5rem', borderRadius: 6, border: '1px solid #e5e7eb' }} />
        {editId ? (
          <>
            <button onClick={handleUpdate} style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>Update</button>
            <button onClick={handleCancel} style={{ background: '#f1f5f9', color: '#4f46e5', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAdd} style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>Add</button>
        )}
      </form>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input type="text" onChange={(e) => setSearchVal(e.target.value)} placeholder="Search products..." style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e5e7eb' }} />
        <button onClick={fetchProducts} style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>Search</button>
      </div>
      <div style={{ overflowX: 'auto', borderRadius: 10 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f9fafb', borderRadius: 10 }}>
          <thead>
            <tr style={{ background: '#f1f5f9', color: '#4f46e5', fontWeight: 700 }}>
              <th style={{ padding: '0.75rem' }}>Product Name</th>
              <th style={{ padding: '0.75rem' }}>Description</th>
              <th style={{ padding: '0.75rem' }}>Price</th>
              <th style={{ padding: '0.75rem' }}>Image Url</th>
              <th style={{ padding: '0.75rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((value, idx) => (
              <tr key={value._id} style={{ background: idx % 2 === 0 ? '#fff' : '#f3f4f6', transition: 'background 0.2s' }}>
                <td style={{ padding: '0.75rem' }}>{value.productName}</td>
                <td style={{ padding: '0.75rem' }}>{value.description}</td>
                <td style={{ padding: '0.75rem' }}>{value.price}</td>
                <td style={{ padding: '0.75rem', wordBreak: 'break-all' }}>{value.imgUrl}</td>
                <td style={{ padding: '0.75rem' }}>
                  <button onClick={() => handleEdit(value)} style={{ background: '#f1f5f9', color: '#4f46e5', border: 'none', borderRadius: 6, padding: '0.3rem 1rem', fontWeight: 600, marginRight: 8, cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(value._id)} style={{ background: '#e11d48', color: '#fff', border: 'none', borderRadius: 6, padding: '0.3rem 1rem', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)} style={{ background: '#f1f5f9', color: '#4f46e5', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: page === 1 ? 'not-allowed' : 'pointer' }}>
          Previous
        </button>
        <span style={{ fontWeight: 600 }}>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} style={{ background: '#f1f5f9', color: '#4f46e5', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>
          Next
        </button>
      </div>
    </div>
  );
}