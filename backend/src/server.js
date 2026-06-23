const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");

const tripRoutes = require("./routes/tripRoutes");

const chatRoutes = require("./routes/chatRoutes");

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Travel Planner API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/trips", tripRoutes);

app.use("/api/chat", chatRoutes);
