const express = require("express");
const router = express.Router();
const {
  CreateEmployee,
  SoftDeleteEmployee,
  HardDeleteEmployee,
  GetDeletedEmployee,
  GetSingleEmployee,
  GetEmployeeListing,
  EditEmployeeById,
  EditEmployeeByToken,
  RestoreSoftDeleteEmployee,
  VerifyEmployee,
  LoginEmployee,
  GetSingleEmployeeByID,
  GetSingleEmployeeByToken,
  CheckEmployee,
  MainLogin,
  UserDetail,
} = require("../Controller/EmployeeController");
const { CheckUser, EmployeeVerify } = require("../Middleware/Auth");
router.route("/CheckEmployee").get(CheckEmployee);
router.route("/CreateEmployee").post(CheckUser, CreateEmployee);
router.route("/MainLogin").post(MainLogin);
router.route("/me").get(UserDetail);
router.route("/LoginEmployee").post(LoginEmployee);
router.route("/SoftDeleteEmployee/:id").delete(SoftDeleteEmployee);
router.route("/HardDeleteEmployee/:id").delete(HardDeleteEmployee);
router.route("/GetSingleEmployeeByID/:id").get(GetSingleEmployeeByID);
router
  .route("/GetSingleEmployeeByToken")
  .get(CheckUser, GetSingleEmployeeByToken);
router.route("/GetEmployeeListing").get(GetEmployeeListing);
router.route("/VerifyEmployee").get(VerifyEmployee);
router.route("/GetDeletedEmployee").get(GetDeletedEmployee);
router.route("/EditEmployeeById/:id").put(EditEmployeeById);
router.route("/EditEmployeeByToken").put(EmployeeVerify, EditEmployeeByToken);
router.route("/RestoreSoftDeleteEmployee/:id").get(RestoreSoftDeleteEmployee);

module.exports = router;
