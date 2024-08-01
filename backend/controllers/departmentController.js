const Department = require("../models/department");

exports.createDepartment = async (req, res) => {
  const { name, description } = req.body;
  try {
    const department = new Department({ name, description });
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: "Department creation failed!" });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: "Fetching departments failed!" });
  }
};
exports.getDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const departments = await Department.findById(id);
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: "Fetching departments failed!" });
  }
};

exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const department = await Department.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: "Updating department failed!" });
  }
};

exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    await Department.findByIdAndDelete(id);
    res.status(204).json({ message: "Record Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Deleting department failed!" });
  }
};
