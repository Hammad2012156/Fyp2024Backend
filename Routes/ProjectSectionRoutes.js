const express = require("express");
const router = express.Router();
const {
  CreateProjectSection,
  SoftDeleteProjectSection,
  HardDeleteProjectSection,
  GetDeletedProjectSection,
  GetSingleProjectSection,
  GetProjectSectionListing,
  EditProjectSection,
  RestoreSoftDeleteProjectSection
} = require("../Controller/ProjectSectionController");

router.route("/CreateProjectSection").post(CreateProjectSection);
router.route("/SoftDeleteProjectSection/:id").delete(SoftDeleteProjectSection);
router.route("/HardDeleteProjectSection/:id").delete(HardDeleteProjectSection);
router.route("/GetSingleProjectSection/:id").get(GetSingleProjectSection);
router.route("/GetProjectSectionListing").get(GetProjectSectionListing);
router.route("/GetDeletedProjectSection").get(GetDeletedProjectSection);
router.route("/EditProjectSection/:id").put(EditProjectSection);
router
  .route("/RestoreSoftDeleteProjectSection/:id")
  .get(RestoreSoftDeleteProjectSection);

module.exports = router;
