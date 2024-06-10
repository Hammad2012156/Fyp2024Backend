const express = require("express");
const router = express.Router();
const {
  CreateMartialStatus,
  SoftDeleteMartialStatus,
  HardDeleteMartialStatus,
  GetDeletedMartialStatus,
  GetSingleMartialStatus,
  GetMartialStatusListing,
  EditMartialStatus,
  RestoreSoftDeleteMartialStatus,
} = require("../Controller/MartialStatusController");

router.route("/CreateMartialStatus").post(CreateMartialStatus);
router.route("/SoftDeleteMartialStatus/:id").delete(SoftDeleteMartialStatus);
router.route("/HardDeleteMartialStatus/:id").delete(HardDeleteMartialStatus);
router.route("/GetSingleMartialStatus/:id").get(GetSingleMartialStatus);
router.route("/GetMartialStatusListing").get(GetMartialStatusListing);
router.route("/GetDeletedMartialStatus").get(GetDeletedMartialStatus);
router.route("/EditMartialStatus/:id").put(EditMartialStatus);
router
  .route("/RestoreSoftDeleteMartialStatus/:id")
  .get(RestoreSoftDeleteMartialStatus);

module.exports = router;
