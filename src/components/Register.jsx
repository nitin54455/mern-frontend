import "./Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/register`;
      const result = await axios.post(url, user);
      setError("Data saved successfully");
      Navigate("/login");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  return (
    <div className="App-Register-Row">
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(79,70,229,0.10)', padding: '2.5rem 2rem', maxWidth: 400, width: '100%' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#4f46e5', marginBottom: '1.5rem', textAlign: 'center', letterSpacing: 1 }}>Registration Form</h2>
        {error && <div style={{ color: error === 'Data saved successfully' ? '#16a34a' : '#e11d48', background: error === 'Data saved successfully' ? '#f0fdf4' : '#fef2f2', borderRadius: 8, padding: '0.5rem 1rem', marginBottom: '1rem', textAlign: 'center', fontWeight: 600 }}>{error}</div>}
        <form onSubmit={e => {e.preventDefault(); handleSubmit();}} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <input
            type="text"
            placeholder="Enter First Name"
            onChange={e => setUser({ ...user, firstName: e.target.value })}
            style={{ padding: '0.7rem 1rem', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: '1rem', outline: 'none', background: '#f9fafb' }}
          />
          <input
            type="text"
            placeholder="Enter Last Name"
            onChange={e => setUser({ ...user, lastName: e.target.value })}
            style={{ padding: '0.7rem 1rem', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: '1rem', outline: 'none', background: '#f9fafb' }}
          />
          <input
            type="text"
            placeholder="Enter Email Address"
            onChange={e => setUser({ ...user, email: e.target.value })}
            style={{ padding: '0.7rem 1rem', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: '1rem', outline: 'none', background: '#f9fafb' }}
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={e => setUser({ ...user, password: e.target.value })}
            style={{ padding: '0.7rem 1rem', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: '1rem', outline: 'none', background: '#f9fafb' }}
          />
          <button type="submit" style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7rem 1rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(79,70,229,0.08)' }}>Submit</button>
        </form>
        <hr style={{ width: '100%', margin: '2rem 0 1.5rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
        <div style={{ textAlign: 'center' }}>
          <Link to="/login" style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none', fontSize: '1rem' }}>Already a member? Login Here...</Link>
        </div>
      </div>
    </div>
  );
}
