const Mailer = require("../../modules/mailer");

const express = require("express");

const idValidation = require("../validations/id.validate");

const VirtualDisplayVoucher = require("../../models/virtual_display_voucher.model");

const {
	getFoods,
	getFoodsType,
	getBranchs,
	addToCart,
	getCart,
	getFoodDetail,
	getVouchersPublic,
	createVoucherTest,
} = require("../controllers/public.controller");
const { verifyMail } = require("../../utils/template.mail");
const Voucher = require("../../models/voucher.model");

const router = express.Router();

// {host}/api/*
router.get("/foods", getFoods);

router.get("/foods/:id", idValidation, getFoodDetail);

router.get("/food-type", getFoodsType);

router.get("/vouchers", getVouchersPublic);

router.get("/create-voucher", createVoucherTest);

router.get("/discount/:id", async function (req, res) {
	const { id } = req.params;

	const voucher = await Voucher.findOne({ _id: id });

	res.json({ count: voucher.discountVoucher(25000) });
});

router.get("/branches", getBranchs);

router.get("/mail", async (req, res) => {
	const mailer = await Mailer.init();

	mailer.sendMail(
		["lethanhquang147@gmail.com"],
		"Hello",
		verifyMail("Lê Thanh Quang", "Ét o Ét")
	);
	res.json({ mailer });
});

module.exports = router;
