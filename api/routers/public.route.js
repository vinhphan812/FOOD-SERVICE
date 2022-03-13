const Mailer = require("../../modules/mailer");

const express = require("express");

const idValidation = require("../validations/id.validate");
const restaurantMiddleware = require("../middlewares/public.middleware");
const {
	getFoodsInRestaurant,
	getFoodsType,
} = require("../controllers/public.controller");
const { verifyMail } = require("../../utils/template.mail");

const router = express.Router();

// {host:port}/api/restaurants/{id}/foods
router.get(
	"/restaurants/:id/foods",
	idValidation,
	restaurantMiddleware,
	getFoodsInRestaurant
);

router.get("/food-type", getFoodsType);
router.get("/mail", async (req, res) => {
	const mailer = await Mailer.init();

	mailer.sendMail(
		["vinhphan812@gmail.com"],
		"Hello",
		verifyMail("Phan Thanh Vinh", "12414")
	);
	res.json({ mailer });
});

module.exports = router;
