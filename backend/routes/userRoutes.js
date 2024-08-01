const express = require("express");
const {
  getEmployees,
  getEmployeeById,
  deleteEmployee,
  filterEmployeesByName,
  getUniqueLocations,
  createUser,
  login,
  filterEmployees,
  updateEmployeeDepartment,
} = require("../controllers/userController");
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", login);
router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.put("/updateEmployeeDepartment/:id", updateEmployeeDepartment);
router.delete("/:id", deleteEmployee);
router.get("/filter/filterEmployees", filterEmployees);
router.get("/filter/:name", filterEmployeesByName);
router.get("/location/uniqueLocations", getUniqueLocations);

module.exports = router;
