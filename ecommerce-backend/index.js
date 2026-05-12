require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err));

// Product Schema
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String
});
const Product = mongoose.model('Product', ProductSchema);

// Get all products
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Submit an order
app.post('/api/orders', async (req, res) => {
    res.status(201).json({ message: "Order placed successfully! Delivery pending." });
});

// Seed Clothing Brand Data
app.get('/api/seed', async (req, res) => {
    await Product.deleteMany({}); // Clears the old gaming data
    const clothingProducts = [
        { name: "Oversized Graphic Tee", price: 1200, description: "100% Premium Cotton", imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Vintage Wash Hoodie", price: 2500, description: "Heavyweight Fleece", imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Cargo Parachute Pants", price: 1800, description: "Relaxed Fit, Multi-Pocket", imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
        { name: "Chunky Street Sneakers", price: 3200, description: "All-day Comfort & Style", imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" }
    ];
    await Product.insertMany(clothingProducts);
    res.send("Clothing Brand seeded! Go check your React app.");
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));