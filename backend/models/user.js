const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["employee", "manager"], required: true },
  name: String,
  location: String,
  department: { type: Object, ref: "Department" },
});

module.exports = mongoose.model("User", userSchema);
