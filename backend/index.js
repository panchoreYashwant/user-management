const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const departmentRoutes = require("./routes/departmentRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);

mongoose
  .connect("mongodb://localhost:27017/userManagement", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => {
    console.error(err);
  });
