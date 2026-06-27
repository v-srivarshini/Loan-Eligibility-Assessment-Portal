const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const applicantRoutes = require("./routes/applicantRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin:"https://loan-eligibility-assessment-portal.vercel.app",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());
app.use("/api", applicantRoutes);

app.get("/", (req, res) => {
  res.send("Loan Eligibility API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});