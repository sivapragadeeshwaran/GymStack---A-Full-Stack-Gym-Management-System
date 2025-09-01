const express = require("express");
const {
  sendMessage,
  getChat,
  getAllowedContacts,
} = require("../controllers/chatController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/send", verifyToken, sendMessage);
router.get("/chat/:userId", verifyToken, getChat);
router.get("/contacts", verifyToken, getAllowedContacts);

module.exports = router;
