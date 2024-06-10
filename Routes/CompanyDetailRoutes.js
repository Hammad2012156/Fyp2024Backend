const express = require("express");
const router = express.Router();
const {
  CreateCompanyDetail,
  SoftDeleteCompanyDetail,
  HardDeleteCompanyDetail,
  GetDeletedCompanyDetail,
  GetSingleCompanyDetail,
  GetCompanyDetailListing,
  EditCompanyDetail,
  RestoreSoftDeleteCompanyDetail,
  VerifyEmail,
} = require("../Controller/CompanyDetailController");

router.route("/CreateCompanyDetail").post(CreateCompanyDetail);
router.route("/VerifyEmail").post(VerifyEmail);
router.route("/SoftDeleteCompanyDetail/:id").delete(SoftDeleteCompanyDetail);
router.route("/HardDeleteCompanyDetail/:id").delete(HardDeleteCompanyDetail);
router.route("/GetSingleCompanyDetail/:id").get(GetSingleCompanyDetail);
router.route("/GetCompanyDetailListing").get(GetCompanyDetailListing);
router.route("/GetDeletedCompanyDetail").get(GetDeletedCompanyDetail);
router.route("/EditCompanyDetail/:id").put(EditCompanyDetail);
router
  .route("/RestoreSoftDeleteCompanyDetail/:id")
  .get(RestoreSoftDeleteCompanyDetail);

module.exports = router;
