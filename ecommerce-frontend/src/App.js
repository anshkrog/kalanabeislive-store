import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('https://ansh-store-zq30.onrender.com/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products", err));
  }, []);

  const addToCart = (product) => setCart([...cart, product]);

  const checkout = () => {
    axios.post('https://ansh-store-zq30.onrender.com/api/products', {
      items: cart,
      customerDetails: { name: "Ansh", address: "Delhi, India" }
    }).then(res => {
      alert("Order placed successfully!");
      setCart([]);
    });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Kalanabeis Clothing</h1>
        <button className="checkout-btn" onClick={checkout}>
          Cart ({cart.length}) - Checkout
        </button>
      </div>
      
      <div className="product-grid">
        {products.map(p => (
          <div key={p._id} className="card">
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="desc">{p.description}</p>
            <p className="price">₹{p.price}</p>
            <button className="add-btn" onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;