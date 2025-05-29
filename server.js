const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/rooms", require("./routes/roomRoutes"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Kết nối MongoDB thành công");
    app.listen(5000, () =>
      console.log("🚀 Server đang chạy tại http://localhost:5000")
    );
  })
  .catch((err) => console.error("❌ MongoDB lỗi:", err));
