const express = require("express");
const router = express.Router();
const {
  CreateEmployeeTask,
  SoftDeleteEmployeeTask,
  HardDeleteEmployeeTask,
  GetDeletedEmployeeTask,
  GetSingleEmployeeTask,
  GetEmployeeTaskListing,
  EditEmployeeTask,
  MyTask,
  RestoreSoftDeleteEmployeeTask
} = require("../Controller/EmployeeTaskController");
const { CheckUser } = require("../Middleware/Auth");
router.route("/CreateEmployeeTask/:id").post(CheckUser, CreateEmployeeTask);
router.route("/SoftDeleteEmployeeTask/:id").delete(SoftDeleteEmployeeTask);
router.route("/HardDeleteEmployeeTask/:id").delete(HardDeleteEmployeeTask);
router.route("/GetSingleEmployeeTask/:id").get(GetSingleEmployeeTask);
router.route("/GetEmployeeTaskListing").get(GetEmployeeTaskListing);
router.route("/MyTask").get(CheckUser, MyTask);
router.route("/GetDeletedEmployeeTask").get(GetDeletedEmployeeTask);
router.route("/EditEmployeeTask/:id").put(EditEmployeeTask);
router
  .route("/RestoreSoftDeleteEmployeeTask/:id")
  .get(RestoreSoftDeleteEmployeeTask);

module.exports = router;
