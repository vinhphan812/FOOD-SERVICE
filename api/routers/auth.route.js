const express = require("express");

const {
	loginHandle,
	forgotHandle,
	signUpHandle,
	logoutHandle,
	loginAdmin,
} = require("../controllers/auth.controller");
const {
	signUpValidate,
	forgotValidate,
} = require("../validations/auth.vailidate");

const router = express.Router();

router.get("/", (req, res, next) =>
	res.json({ success: true, message: "AUTHENTICATION_ROUTER" })
);

router.post("/login", loginHandle);

router.post("/signup", signUpValidate, signUpHandle);

router.post("/forgot", forgotValidate, forgotHandle);

router.get("/logout", logoutHandle);

module.exports = router;
