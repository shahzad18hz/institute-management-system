require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const admissionRoutes = require("./routes/admissionRouter");
const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const feeRoutes = require("./routes/feeRoutes");
const setupRoutes = require("./routes/setup");
const receptionistRoutes = require("./routes/receptionistRoutes")

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Database connect
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Innobrains IT Backend Running");
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/setup", setupRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/receptionists", receptionistRoutes);

// ✅ Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
