import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="admin-container" style={{ maxWidth: 900, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#4f46e5', marginBottom: '1.5rem', letterSpacing: 1 }}>Admin Dashboard</h2>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/admin" className="admin-nav-btn" style={{ padding: '0.5rem 1.5rem', borderRadius: 8, background: '#f1f5f9', color: '#4f46e5', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }}>Users</Link>
        <Link to="/admin/products" className="admin-nav-btn" style={{ padding: '0.5rem 1.5rem', borderRadius: 8, background: '#f1f5f9', color: '#4f46e5', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }}>Products</Link>
        <Link to="/admin/orders" className="admin-nav-btn" style={{ padding: '0.5rem 1.5rem', borderRadius: 8, background: '#f1f5f9', color: '#4f46e5', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }}>Orders</Link>
      </nav>
      <div style={{ background: '#f9fafb', borderRadius: 12, padding: '1.5rem', minHeight: 300 }}>
        <Outlet />
      </div>
    </div>
  );
}
