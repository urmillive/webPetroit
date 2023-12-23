const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const authController = require("../controllers/auth.controller");

router.get("/", authMiddleware, authController.getProfile);
router.post("/login", authController.login);
router.post("/signup", authController.signup);

module.exports = router;
