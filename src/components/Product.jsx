import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const { user, cart, setCart } = useContext(AppContext);
  const navigate = useNavigate();
  const [findValue, setFindValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const url = `${API_URL}/api/products/all`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setFilteredProducts(result.data.products);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.qty = 1;
      setCart([...cart, product]);
    }
    navigate("/cart");
  };

  // Helper function for INR formatting
  function formatINR(amount) {
    return '₹' + amount.toLocaleString('en-IN');
  }

  const handleFind = (e) => {
    e.preventDefault();
    if (!findValue.trim()) {
      setFilteredProducts(products);
      return;
    }
    const search = findValue.trim().toLowerCase();
    setFilteredProducts(
      products.filter(
        (p) =>
          p.productName.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
      )
    );
  };

  return (
    <>
      <section className="hero-section">
        <h1 className="hero-title">Welcome to Our Shop</h1>
        <p className="hero-desc">Discover the best products at unbeatable prices. Shop the latest trends and enjoy fast delivery!</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
          <button
            className="hero-cta"
            onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
            style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 2rem', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(79,70,229,0.08)' }}
          >
            Shop Now
          </button>
          <form onSubmit={handleFind} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: '#f9fafb', borderRadius: 8, padding: '0.3rem 0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <input
              type="text"
              value={findValue}
              onChange={e => setFindValue(e.target.value)}
              placeholder="Type to find..."
              style={{ flex: 1, minWidth: 120, border: 'none', outline: 'none', background: 'transparent', padding: '0.5rem', fontSize: '1rem' }}
            />
            <button
              type="submit"
              style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}
            >
              Find
            </button>
          </form>
        </div>
      </section>
      <div className="container">
        <div className="grid">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.imgUrl} alt={product.productName} />
                <h3>{product.productName}</h3>
                <p>{product.description}</p>
                <h4>{formatINR(product.price)}</h4>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', fontSize: '1.2rem', marginTop: '2rem' }}>
              No products found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
