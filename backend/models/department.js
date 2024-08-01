const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  // employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
});

module.exports = mongoose.model("Department", DepartmentSchema);
