const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ================== KẾT NỐI MONGODB ATLAS ==================
mongoose
  .connect(
    "mongodb+srv://mnhut986958:mnhut986958@database.cxztmwh.mongodb.net/medicines?retryWrites=true&w=majority&appName=database",
    {
      // 2 option này không cần cho Mongoose v7+
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ Đã kết nối MongoDB Atlas"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// ================== SCHEMA & MODEL ==================
const medicineSchema = new mongoose.Schema({
  id: String,        // bạn có cột id trong Atlas
  name: String,
  price: Number,
  rating: Number,
  description: String,
  image: String,
});

const Medicine = mongoose.model("medicine", medicineSchema, "medicine");
// tham số cuối "medicine" để chắc chắn dùng đúng collection trong Atlas

// ================== ROUTES ==================

// GET all medicines
app.get("/medicines", async (req, res) => {
  try {
    const list = await Medicine.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("🚀 API MongoDB Atlas đã chạy thành công!");
});

// ================== SERVER ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});


/*const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ===== KẾT NỐI MONGODB ATLAS =====
const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://mnhut986958:mnhut986958@database.cxztmwh.mongodb.net/medicines?retryWrites=true&w=majority&appName=database";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Đã kết nối MongoDB Atlas"))
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
  res.send(" API is running! Try /medicines");
});

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
  console.log("Server chạy tại http://0.0.0.0:${PORT}");
});*/
