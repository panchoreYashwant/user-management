const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Department = require("../models/department");
const saltRounds = 10;
exports.createUser = async (req, res) => {
  const { username, password, role, name, location } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      username,
      password: hashedPassword, // Save the hashed password
      role,
      name,
      location,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "User creation failed!" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid password!" });
    }
    res.json({ userId: user._id, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Login failed!" });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await User.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Fetching employees failed!" });
  }
};

exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await User.findById(id);
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Fetching employees by ID failed!" });
  }
};

exports.updateEmployeeDepartment = async (req, res) => {
  const { id } = req.params;
  const { department } = req.body;
  try {
    const employee = await User.findByIdAndUpdate(
      id,
      { department: department },
      { new: true }
    );
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Updating employee failed!" });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await User.findByIdAndDelete(id);
    const department = await Department.findById(employee.department);
    department.employees.pull(employee);
    await department.save();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Deleting employee failed!" });
  }
};

exports.filterEmployees = async (req, res) => {
  try {
    let employees;

    const sortOrder = req.query.order === "desc" ? -1 : 1;
    const sortField = req.query.field || "location";

    const locationFilter = req.query.location;

    if (locationFilter) {
      employees = await User.find({ location: locationFilter }).sort({
        [sortField]: sortOrder,
      });
    } else if (req.query.field) {
      employees = await User.find().sort({ [sortField]: sortOrder });
    } else {
      employees = await User.find();
    }

    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Operation failed!" });
  }
};

exports.filterEmployeesByName = async (req, res) => {
  const { name } = req.params;
  try {
    const employees = await User.find({ name: new RegExp(name, "i") }).sort({
      name: 1,
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Filtering employees by name failed!" });
  }
};

exports.getUniqueLocations = async (req, res) => {
  try {
    const uniqueLocations = await User.distinct("location");
    res.json(uniqueLocations);
  } catch (error) {
    res.status(500).json({ error: "Fetching unique locations failed!" });
  }
};
