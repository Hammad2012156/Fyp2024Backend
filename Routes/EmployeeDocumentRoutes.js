const express = require("express");
const router = express.Router();
const {
  CreateEmployeeDocument,
  SoftDeleteEmployeeDocument,
  HardDeleteEmployeeDocument,
  GetDeletedEmployeeDocument,
  GetSingleEmployeeDocument,
  GetEmployeeDocumentListing,
  EditEmployeeDocument,
  RestoreSoftDeleteEmployeeDocument,
  CreateEmployeeDocumentbytoken
} = require("../Controller/EmployeeDocumentController");
const { CheckUser } = require("../Middleware/Auth")
router.route("/CreateEmployeeDocumentbytoken").post(CheckUser, CreateEmployeeDocumentbytoken);
router.route("/CreateEmployeeDocument/:id").post(CreateEmployeeDocument);
router
  .route("/SoftDeleteEmployeeDocument/:id")
  .delete(SoftDeleteEmployeeDocument);
router
  .route("/HardDeleteEmployeeDocument/:id")
  .delete(HardDeleteEmployeeDocument);
router.route("/GetSingleEmployeeDocument/:id").get(GetSingleEmployeeDocument);
router.route("/GetEmployeeDocumentListing").get(GetEmployeeDocumentListing);
router.route("/GetDeletedEmployeeDocument").get(GetDeletedEmployeeDocument);
router.route("/EditEmployeeDocument/:id").put(EditEmployeeDocument);
router
  .route("/RestoreSoftDeleteEmployeeDocument/:id")
  .get(RestoreSoftDeleteEmployeeDocument);

module.exports = router;
