const express = require("express");
const router = express.Router();
const {
  CreateCeo,
  SoftDeleteCeo,
  HardDeleteCeo,
  GetDeletedCeo,
  GetSingleCeo,
  GetCeoListing,
  EditCeo,
  LoginCeo,
  RestoreSoftDeleteCeo,
} = require("../Controller/CeoController");

router.route("/CreateCeo").post(CreateCeo);
router.route("/LoginCeo").post(LoginCeo);
router.route("/SoftDeleteCeo/:id").delete(SoftDeleteCeo);
router.route("/HardDeleteCeo/:id").delete(HardDeleteCeo);
router.route("/GetSingleCeo/:id").get(GetSingleCeo);
router.route("/GetCeoListing").get(GetCeoListing);
router.route("/GetDeletedCeo").get(GetDeletedCeo);
router.route("/EditCeo/:id").put(EditCeo);
router.route("/RestoreSoftDeleteCeo/:id").get(RestoreSoftDeleteCeo);

module.exports = router;
