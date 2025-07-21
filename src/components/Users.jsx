import React, { useEffect, useState, useRef, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUsers = async () => {
    if (!user?.token) return;
    try {
      setError("Loading...");
      const url = `${API_URL}/api/users/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUsers(Array.isArray(result.data.users) ? result.data.users : []);
      setTotalPages(result.data.total || 1);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/users/${id}`;
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
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
      const url = `${API_URL}/api/users`;
      await axios.post(url, form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setError("User added successfully");
      fetchUsers();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role,
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
      const url = `${API_URL}/api/users/${editId}`;
      await axios.patch(url, form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchUsers();
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="users-admin-container" style={{ maxWidth: 900, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem' }}>
      <h2 style={{ fontSize: '1.7rem', fontWeight: 700, color: '#4f46e5', marginBottom: '1.5rem', letterSpacing: 1 }}>User Management</h2>
      {error && <div style={{ color: '#e11d48', marginBottom: '1rem', fontWeight: 500 }}>{error}</div>}
      <form ref={frmRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', background: '#f9fafb', borderRadius: 10, padding: '1rem' }}>
        <input name="firstName" value={form.firstName} type="text" placeholder="First Name" onChange={handleChange} required style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e5e7eb' }} />
        <input name="lastName" value={form.lastName} type="text" placeholder="Last Name" onChange={handleChange} required style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e5e7eb' }} />
        <input name="email" value={form.email} type="text" placeholder="Email Address" onChange={handleChange} required style={{ flex: 2, padding: '0.5rem', borderRadius: 6, border: '1px solid #e5e7eb' }} />
        <input name="password" value={form.password} type="password" placeholder="New Password" onChange={handleChange} required style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e5e7eb' }} />
        <select name="role" value={form.role} required onChange={handleChange} style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff' }}>
          <option value="">--Select Role--</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
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
        <input type="text" placeholder="Search..." value={searchVal} onChange={(e) => setSearchVal(e.target.value)} style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e5e7eb' }} />
        <button onClick={() => fetchUsers()} style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>Search</button>
      </div>
      <div style={{ overflowX: 'auto', borderRadius: 10 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f9fafb', borderRadius: 10 }}>
          <thead>
            <tr style={{ background: '#f1f5f9', color: '#4f46e5', fontWeight: 700 }}>
              <th style={{ padding: '0.75rem' }}>First Name</th>
              <th style={{ padding: '0.75rem' }}>Last Name</th>
              <th style={{ padding: '0.75rem' }}>Email Address</th>
              <th style={{ padding: '0.75rem' }}>Role</th>
              <th style={{ padding: '0.75rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.map((value, idx) => (
              <tr key={value._id} style={{ background: idx % 2 === 0 ? '#fff' : '#f3f4f6', transition: 'background 0.2s' }}>
                <td style={{ padding: '0.75rem' }}>{value.firstName}</td>
                <td style={{ padding: '0.75rem' }}>{value.lastName}</td>
                <td style={{ padding: '0.75rem' }}>{value.email}</td>
                <td style={{ padding: '0.75rem' }}>{value.role}</td>
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
