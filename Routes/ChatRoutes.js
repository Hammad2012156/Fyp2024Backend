const express = require("express");
const router = express.Router();
const { EmployeeVerify } = require("../Middleware/Auth");
const {
  UserPeerToPeerChatListing,
  UserPeerChat,
  UserGroupChatListing,
  UserGroupDetail,
  SendMessageOnGroup,
  SendMessageOnPeer
} = require("../Controller/ChatController");
router
  .route("/UserPeerToPeerChatListing")
  .get(EmployeeVerify, UserPeerToPeerChatListing);
router.route("/UserGroupChatListing").get(EmployeeVerify, UserGroupChatListing);
router
  .route("/SendMessageOnGroup/:id")
  .post(EmployeeVerify, SendMessageOnGroup);
router
  .route("/SendMessageOnPeer/:id")
  .post(EmployeeVerify, SendMessageOnPeer);
router.route("/UserPeerChat/:id").get(EmployeeVerify, UserPeerChat);
router.route("/UserGroupDetail/:id").get(EmployeeVerify, UserGroupDetail);

module.exports = router;
