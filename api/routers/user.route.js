const express = require("express");
const { changePassword } = require("../controllers/user.controller");

const ctrler = require("../controllers/user.controller");

const router = express.Router();

//{host}/api/user/
router.route("/").get(ctrler.getMe).put(ctrler.updateMe);

router.post("/change-password", changePassword);

router.get("/vouchers", ctrler.getMyVouchers);

router.post("/take-voucher", ctrler.takeVoucher);

router.get("/notifications", ctrler.getMyNotifications);

router.get("/history-orders", ctrler.getMyHistoryOrders);

router.post("/seen-notifications", ctrler.seenNotifications);

router.post("/orders", ctrler.createOrder);

router.get("/orders/:id", ctrler.getOrderDetail);

router.post("/upScore", ctrler.upScore);

router.post("/check-voucher/:id", ctrler.checkVoucher);

router.post("/confirm-mail", ctrler.confirmMail); // no complete

router.route("/cart").get(ctrler.getCart).post(ctrler.addToCart);

module.exports = router;
