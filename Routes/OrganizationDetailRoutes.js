const express = require("express");
const router = express.Router();
const {
  CreateOrganizationDetail,
  SoftDeleteOrganizationDetail,
  HardDeleteOrganizationDetail,
  GetDeletedOrganizationDetail,
  GetSingleOrganizationDetail,
  GetOrganizationDetailListing,
  EditOrganizationDetail,
  RestoreSoftDeleteOrganizationDetail,
} = require("../Controller/OrganizationDetailController");
const { CheckUser } = require("../Middleware/Auth");
router
  .route("/CreateOrganizationDetail")
  .post(CheckUser, CreateOrganizationDetail);
router
  .route("/SoftDeleteOrganizationDetail/:id")
  .delete(SoftDeleteOrganizationDetail);
router
  .route("/HardDeleteOrganizationDetail/:id")
  .delete(HardDeleteOrganizationDetail);
router
  .route("/GetSingleOrganizationDetail/:id")
  .get(GetSingleOrganizationDetail);
router.route("/GetOrganizationDetailListing").get(GetOrganizationDetailListing);
router.route("/GetDeletedOrganizationDetail").get(GetDeletedOrganizationDetail);
router.route("/EditOrganizationDetail/:id").put(EditOrganizationDetail);
router
  .route("/RestoreSoftDeleteOrganizationDetail/:id")
  .get(RestoreSoftDeleteOrganizationDetail);

module.exports = router;
