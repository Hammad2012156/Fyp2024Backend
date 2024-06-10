const express = require("express");
const router = express.Router();
const {
  CreateMeeting,
  SoftDeleteMeeting,
  HardDeleteMeeting,
  GetDeletedMeeting,
  GetSingleMeeting,
  GetMeetingListing,
  MeetingSchedule,
  QuickMeeting,
  EditMeeting,
  RestoreSoftDeleteMeeting,
  JoinMeeting
} = require("../Controller/MeetingController");
const { CheckUser } = require("../Middleware/Auth");
router.route("/JoinMeeting/:id").get(CheckUser, JoinMeeting);
router.route("/MeetingSchedule").get(CheckUser, MeetingSchedule);
router.route("/QuickMeeting").post(CheckUser, QuickMeeting);
router.route("/SoftDeleteMeeting/:id").delete(SoftDeleteMeeting);
router.route("/CreateMeeting").post(CreateMeeting);
router.route("/HardDeleteMeeting/:id").delete(HardDeleteMeeting);
router.route("/GetSingleMeeting/:id").get(GetSingleMeeting);
router.route("/GetMeetingListing").get(GetMeetingListing);
router.route("/GetDeletedMeeting").get(GetDeletedMeeting);
router.route("EditMeeting/:id").put(EditMeeting);
router.route("/RestoreSoftDeleteMeeting/:id").get(RestoreSoftDeleteMeeting);

module.exports = router;
