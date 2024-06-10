const express = require("express");
const router = express.Router();
const {
  CreateCompanyTheme,
  SoftDeleteCompanyTheme,
  HardDeleteCompanyTheme,
  GetDeletedCompanyTheme,
  GetSingleCompanyTheme,
  GetCompanyThemeListing,
  EditCompanyTheme,
  RestoreSoftDeleteCompanyTheme,
} = require("../Controller/CompanyThemeController");

router.route("/CreateCompanyTheme").post(CreateCompanyTheme);
router.route("/SoftDeleteCompanyTheme/:id").delete(SoftDeleteCompanyTheme);
router.route("/HardDeleteCompanyTheme/:id").delete(HardDeleteCompanyTheme);
router.route("/GetSingleCompanyTheme/:id").get(GetSingleCompanyTheme);
router.route("/GetCompanyThemeListing").get(GetCompanyThemeListing);
router.route("/GetDeletedCompanyTheme").get(GetDeletedCompanyTheme);
router.route("/EditCompanyTheme/:id").put(EditCompanyTheme);
router
  .route("/RestoreSoftDeleteCompanyTheme/:id")
  .get(RestoreSoftDeleteCompanyTheme);

module.exports = router;
