import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import App, { AppContext } from "../App";
export default function Header() {
  const { user } = useContext(AppContext);
  return (
    <header className="bg-white shadow-lg px-8 py-4 flex items-center justify-between rounded-b-2xl border-b border-gray-100 mb-6 sticky top-0 z-20">
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-indigo-700 drop-shadow-sm select-none">MERN Frontend</h1>
      <nav className="flex gap-4 md:gap-8">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : undefined} end>Home</NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? "active" : undefined}>MyCart</NavLink>
        <NavLink to="/order" className={({ isActive }) => isActive ? "active" : undefined}>MyOrder</NavLink>
        {/* <NavLink to="/admin">Admin</NavLink> */}
        {user?.role === "admin" && (
          <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : undefined}>Admin</NavLink>
        )}
        {user?.token ? (
          <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : undefined}>Profile</NavLink>
        ) : (
          <NavLink to="/login" className={({ isActive }) => isActive ? "active" : undefined}>Login</NavLink>
        )}
      </nav>
    </header>
  );
}
