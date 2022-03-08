const express = require("express");

const userRoute = require("./user.route");
const publicRoute = require("./public.route");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// public route
router.use("/", publicRoute);

// authentication middleware
router.use(authMiddleware);
router.use("/user", userRoute);

router.get("/", function (req, res, next) {
	res.json({ success: true, message: "route api of Foozie" });
});

module.exports = router;
