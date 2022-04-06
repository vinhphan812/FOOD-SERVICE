const express = require("express");

const ctrler = require("../controllers/user.controller");

const router = express.Router();

//{host}/api/user/
router.route("/").get(ctrler.getMe).put(ctrler.updateMe);

router.get("/vouchers", ctrler.getMyVouchers);

router.get("/notifications", ctrler.getMyNotifications);

router.get("/history-orders", ctrler.getMyHistoryOrders);

router.post("/seen-notifications", ctrler.seenNotifications);

router.post("/orders", ctrler.createOrder);

router.post("/upScore", ctrler.upScore);

router.post("/confirm-mail", ctrler.confirmMail);

module.exports = router;
