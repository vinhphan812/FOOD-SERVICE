const Food = require("../../models/food.model");
const FoodType = require("../../models/food_type.model");
const Branch = require("../../models/branch.model");
const { ignoreModel } = require("../../utils/constant");
const SessionStore = require("../../models/session_store.model");

module.exports = {
	getFoods: async (req, res) => {
		try {
			const { id } = req.params;

			const data = await Food.getAll();
			res.json({ success: true, data });
		} catch ({ message }) {
			res.json({ success: false, message });
		}
	},
	getFoodDetail: async (req, res) => {
		const { id } = req.params;

		const data = await Food.get(id);

		res.json({ success: true, data });
	},
	getFoodsType: async (req, res) => {
		try {
			const data = await FoodType.getAll();

			res.json({ success: true, data });
		} catch ({ message }) {
			res.json({ success: false, message });
		}
	},
	getBranchs: async (req, res) => {
		const data = await Branch.find(
			{},
			ignoreModel(["created_at", "updated_at"])
		);
		res.json({ success: true, data });
	},
	addToCart: async (req, res) => {
		const { food, type } = req.body;
		const { sessionId } = res.locals;

		if (food.length != 24)
			return res.json({ success: false, message: "ID_INVALID" });

		if (!(await Food.findOne({ _id: food })))
			return res.json({
				success: false,
				message: "FOOD_NOT_CONTAINT",
			});
		// type is a [INCREASEMENT, DECREASEMENT]
		const message = await SessionStore.addCart(sessionId, food, type);
		res.json({ success: true, message });
	},
	getCart: async (req, res) => {
		const { sessionId } = res.locals;

		const data = await SessionStore.getCart(sessionId);

		res.json({ success: true, data });
	},
};
