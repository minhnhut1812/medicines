const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB local
mongoose
  .connect("mongodb://localhost:27017/medicines", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Đã kết nối MongoDB"))
  .catch((err) => console.error(" Lỗi kết nối MongoDB:", err));

// Định nghĩa Schema
const medicineSchema = new mongoose.Schema({
  name: String,
  price: Number,
  rating: Number,
  description: String,
  image: String,
});

const Medicine = mongoose.model("Medicine", medicineSchema);

// ======================= ROUTES =======================

// GET all medicines
app.get("/medicines", async (req, res) => {
  try {
    const list = await Medicine.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Khởi động server
const PORT = 3000;
app.listen(3000, "0.0.0.0", () => {
  console.log("Server chạy tại http://0.0.0.0:3000");
});
