const express = require("express");

const idValidation = require("../validations/id.validate");
const restaurantMiddleware = require("../middlewares/public.middleware");
const { getFoodsInRestaurant } = require("../controllers/public.controller");

const router = express.Router();

// {host:port}/api/restaurants/{id}/foods
router.get(
	"/restaurants/:id/foods",
	idValidation,
	restaurantMiddleware,
	getFoodsInRestaurant
);

module.exports = router;
