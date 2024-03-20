//importing libraries
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const app = express();

// using express.json to parse json data
app.use(express.json());

// Allowing other ways to parse data
app.use(express.urlencoded({ extended: false }));

// connecting to mongodb
mongoose
  .connect(
    "mongodb+srv://MementoMori11723:BdEnizfTd1KVPWxO@leviathan.rz9fwzx.mongodb.net/Mongo-Crud?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Database");
    app.listen(5173, () => {
      console.log("Listening to app on http://localhost:5173");
    });
  })
  .catch(() => console.error("Error occured while connecting to Database!"));

// Creating new data
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get all data
app.get("/api/products", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get data with an id
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update the existing value of an id
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete data based on id
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
