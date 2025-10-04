// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Thay USERNAME, PASSWORD, DBNAME bằng thông tin của bạn
const MONGO_URI = "mongodb+srv://minhnhut:minhnhut1812@cluster0.abcd123.mongodb.net/medicines?retryWrites=true&w=majority";

// Kết nối MongoDB Atlas
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.log("MongoDB connection error:", err));
db.once("open", () => console.log("MongoDB connected successfully"));

// Schema & Model
const medicineSchema = new mongoose.Schema({
  name: String,
  price: Number,
  rating: Number,
  description: String,
  image: String,
});

const Medicine = mongoose.model("Medicine", medicineSchema);

// API: Lấy tất cả medicines
app.get("/medicines", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Thêm mới medicine (test)
app.post("/medicines", async (req, res) => {
  try {
    const newMed = new Medicine(req.body);
    const savedMed = await newMed.save();
    res.json(savedMed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/*const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ===== KẾT NỐI MONGODB =====
// Trên Render, bạn cần dùng MongoDB Atlas (cloud), không thể dùng localhost
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/medicines";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Đã kết nối MongoDB"))
  .catch((err) => console.error("Lỗi kết nối MongoDB:", err));

// ===== SCHEMA =====
const medicineSchema = new mongoose.Schema({
  name: String,
  price: Number,
  rating: Number,
  description: String,
  image: String,
});

const Medicine = mongoose.model("Medicine", medicineSchema);

// ===== ROUTES =====
app.get("/", (req, res) => {
  res.send("API is running! Try /medicines");
});

// GET all medicines
app.get("/medicines", async (req, res) => {
  try {
    const list = await Medicine.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== START SERVER =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server chạy tại http://0.0.0.0:${PORT}`);
});*/
