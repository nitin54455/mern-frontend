import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const { user, cart, setCart } = useContext(AppContext);
  const fetchProducts = async () => {
    try {
      const url = `${API_URL}/api/products/all`;
      const result = await axios.get(url);
      setProducts(result.data.products);
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
  };

  // Helper function for INR formatting
  function formatINR(amount) {
    return '₹' + amount.toLocaleString('en-IN');
  }

  return (
    <>
      <section className="hero-section">
        <h1 className="hero-title">Welcome to Our Shop</h1>
        <p className="hero-desc">Discover the best products at unbeatable prices. Shop the latest trends and enjoy fast delivery!</p>
        <button className="hero-cta" onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}>Shop Now</button>
      </section>
      <div className="container">
        <div className="grid">
          {products && products.length > 0 ? (
            products.map((product) => (
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
