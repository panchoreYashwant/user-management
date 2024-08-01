const express = require("express");
const {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
  getDepartment,
} = require("../controllers/departmentController");
const router = express.Router();

router.post("/", createDepartment);
router.get("/", getDepartments);
router.get("/:id", getDepartment);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

module.exports = router;
