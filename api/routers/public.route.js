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
} = require("../controllers/public.controller");
const { verifyMail } = require("../../utils/template.mail");
const Voucher = require("../../models/voucher.model");

const router = express.Router();

// {host}/api/*
router.get("/foods", getFoods);

router.get("/foods/:id", idValidation, getFoodDetail);

router.get("/food-type", getFoodsType);

router.get("/vouchers", async (req, res) => {
	const vouchersData = [
		{
			name: "voucher shipper",
			icon: "",
			code: "FREESHIP",
			description: "",
			voucher_type: "SHIPPING",
			discount_type: "PERCENT",
			discount: 50,
			max_price: 25000,
			max_used: 10,
			used: 5,
			min_price: 0,
			max_price: 0,
			is_delete: false,
		},
		{
			name: "voucher giảm giá 50% tối đa 5000đ",
			icon: "",
			code: "V50PT5K",
			description: "",
			voucher_type: "USING",
			discount_type: "PERCENT",
			discount: 50,
			max_used: 10,
			used: 5,
			min_price: 0,
			max_price: 5000,
			is_delete: false,
		},
		{
			name: "voucher giảm 10000đ",
			icon: "",
			code: "VC10k",
			description: "",
			voucher_type: "USING",
			discount_type: "MONEY",
			discount: 30,
			max_used: 10,
			used: 5,
			min_price: 0,
			max_price: 0,
			is_delete: false,
		},
	];

	const voucher = await Voucher.create(vouchersData);

	// for (const vou of voucher)
	// 	await VirtualDisplayVoucher.create({
	// 		user_id: "6245ea90bac86a45105c9487",
	// 		voucher_id: vou.id,
	// 	});

	const data = await Voucher.getValid();
	res.json({ success: true, data });
});

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
