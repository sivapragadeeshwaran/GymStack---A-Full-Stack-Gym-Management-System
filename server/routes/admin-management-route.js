const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/verifyToken.js');
const isAdmin = require('../middleware/isAdmin.js');

const {
  addAdmin,
  getAllAdmins,
  deleteAdmin,
} = require("../controllers/adminController");

router.get("/", verifyToken, isAdmin, getAllAdmins);
router.post("/", verifyToken, isAdmin, addAdmin);
router.delete("/:id", verifyToken, isAdmin, deleteAdmin);

module.exports = router;
