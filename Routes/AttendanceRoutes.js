const express = require("express");
const router = express.Router();
const {
  CreateAttendance,
  SoftDeleteAttendance,
  HardDeleteAttendance,
  GetDeletedAttendance,
  GetSingleAttendance,
  GetAttendanceListing,
  EditAttendance,
  RestoreSoftDeleteAttendance,
  MarkAttendance,
  TimeIn,
  EmployeeTime,
  LeaveToBeApprove,
  ApplyLeave,
  TimeOut,
  EmployeeAttendanceCalender,
  EmployeeLeaveRequested,
  ApproveLeave,
  RejectLeave
} = require("../Controller/AttendanceController");
const { EmployeeVerify } = require("../Middleware/Auth");

router
  .route("/EmployeeAttendanceCalender")
  .get(EmployeeVerify, EmployeeAttendanceCalender);
router
  .route("/EmployeeLeaveRequested")
  .get(EmployeeVerify, EmployeeLeaveRequested);
router.route("/ApplyLeave").post(EmployeeVerify, ApplyLeave);
router.route("/RejectLeave/:id").put(EmployeeVerify, RejectLeave);
router.route("/ApproveLeave/:id").put(EmployeeVerify, ApproveLeave);
router.route("/LeaveToBeApprove").get(EmployeeVerify, LeaveToBeApprove);
router.route("/TimeOut/:id").post(EmployeeVerify, TimeOut);
router.route("/EmployeeTime").get(EmployeeVerify, EmployeeTime);
router.route("/TimeIn").post(EmployeeVerify, TimeIn);
router.route("/MarkAttendance").post(EmployeeVerify, MarkAttendance);
router.route("/CreateAttendance").post(CreateAttendance);
router.route("/SoftDeleteAttendance/:id").delete(SoftDeleteAttendance);
router.route("/HardDeleteAttendance/:id").delete(HardDeleteAttendance);
router.route("/GetSingleAttendance/:id").get(GetSingleAttendance);
router.route("/GetAttendanceListing").get(GetAttendanceListing);
router.route("/GetDeletedAttendance").get(GetDeletedAttendance);
router.route("/EditAttendance/:id").put(EditAttendance);
router
  .route("/RestoreSoftDeleteAttendance/:id")
  .get(RestoreSoftDeleteAttendance);

module.exports = router;
