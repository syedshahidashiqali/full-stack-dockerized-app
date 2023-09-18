const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { getMyProfile } = require("../controllers/user");

router.get("/me", verifyToken, getMyProfile);

module.exports = router;