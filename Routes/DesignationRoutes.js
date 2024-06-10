const express = require("express");
const router = express.Router();
const {
  CreateDesignation,
  SoftDeleteDesignation,
  HardDeleteDesignation,
  GetDeletedDesignation,
  GetSingleDesignation,
  GetDesignationListing,
  EditDesignation,
  RestoreSoftDeleteDesignation,
} = require("../Controller/DesignationController");

router.route("/CreateDesignation").post(CreateDesignation);
router.route("/SoftDeleteDesignation/:id").delete(SoftDeleteDesignation);
router.route("/HardDeleteDesignation/:id").delete(HardDeleteDesignation);
router.route("/GetSingleDesignation/:id").get(GetSingleDesignation);
router.route("/GetDesignationListing").get(GetDesignationListing);
router.route("/GetDeletedDesignation").get(GetDeletedDesignation);
router.route("/EditDesignation/:id").put(EditDesignation);
router
  .route("/RestoreSoftDeleteDesignation/:id")
  .get(RestoreSoftDeleteDesignation);

module.exports = router;
