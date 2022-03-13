const express = require("express");

const {
	changeRole,
	getMe,
	confirmMail,
} = require("../controllers/user.controller");

const router = express.Router();

//{host}/api/user/
router.get("/", getMe);

// {host:port}/api/user/change-role
router.post("/change-role", changeRole);
// {host:port}/api/user/confirm-mail
router.post("/confirm-mail", confirmMail);

module.exports = router;
