const express = require("express");
const router = express.Router();
const {
  CreateState,
  SoftDeleteState,
  HardDeleteState,
  GetDeletedState,
  GetSingleState,
  GetStateListing,
  EditState,
  RestoreSoftDeleteState,
} = require("../Controller/StateController");

router.route("/CreateState").post(CreateState);
router.route("/SoftDeleteState/:id").delete(SoftDeleteState);
router.route("/HardDeleteState/:id").delete(HardDeleteState);
router.route("/GetSingleState/:id").get(GetSingleState);
router.route("/GetStateListing").get(GetStateListing);
router.route("/GetDeletedState").get(GetDeletedState);
router.route("EditState/:id").put(EditState);
router.route("/RestoreSoftDeleteState/:id").get(RestoreSoftDeleteState);

module.exports = router;
