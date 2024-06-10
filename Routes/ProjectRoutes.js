const express = require("express");
const router = express.Router();
const {
  CreateProject,
  SoftDeleteProject,
  HardDeleteProject,
  GetDeletedProject,
  GetSingleProject,
  GetProjectListing,
  EditProject,
  RestoreSoftDeleteProject
} = require("../Controller/ProjectController");
const { CheckUser } = require("../Middleware/Auth");
router.route("/CreateProject").post(CheckUser, CreateProject);
router.route("/SoftDeleteProject/:id").delete(SoftDeleteProject);
router.route("/HardDeleteProject/:id").delete(HardDeleteProject);
router.route("/GetSingleProject/:id").get(GetSingleProject);
router.route("/GetProjectListing").get(GetProjectListing);
router.route("/GetDeletedProject").get(GetDeletedProject);
router.route("/EditProject/:id").put(EditProject);
router.route("/RestoreSoftDeleteProject/:id").get(RestoreSoftDeleteProject);

module.exports = router;
