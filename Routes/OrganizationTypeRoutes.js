const express = require("express");
const router = express.Router();
const {
  CreateOrganizationType,
  SoftDeleteOrganizationType,
  HardDeleteOrganizationType,
  GetDeletedOrganizationType,
  GetSingleOrganizationType,
  GetOrganizationTypeListing,
  EditOrganizationType,
  RestoreSoftDeleteOrganizationType,
} = require("../Controller/OrganizationTypeController");

router.route("/CreateOrganizationType").post(CreateOrganizationType);
router
  .route("/SoftDeleteOrganizationType/:id")
  .delete(SoftDeleteOrganizationType);
router
  .route("/HardDeleteOrganizationType/:id")
  .delete(HardDeleteOrganizationType);
router.route("/GetSingleOrganizationType/:id").get(GetSingleOrganizationType);
router.route("/GetOrganizationTypeListing").get(GetOrganizationTypeListing);
router.route("/GetDeletedOrganizationType").get(GetDeletedOrganizationType);
router.route("/EditOrganizationType/:id").put(EditOrganizationType);
router
  .route("/RestoreSoftDeleteOrganizationType/:id")
  .get(RestoreSoftDeleteOrganizationType);

module.exports = router;
