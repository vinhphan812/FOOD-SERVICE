const express = require("express");

const idValidation = require("../validations/id.validate");

const VirtualDisplayVoucher = require("../../models/virtual_display_voucher.model");

const {
	getFoods,
	getFoodsType,
	getBranchs,
	getFoodDetail,
	getVouchersPublic,
	createVoucherTest,
	calculatorShippingFee,
} = require("../controllers/public.controller");
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

router.post("/shipping-distance", calculatorShippingFee);

router.get("/branches", getBranchs);

module.exports = router;
