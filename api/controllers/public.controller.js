const Food = require("../../models/food.model");
const FoodType = require("../../models/food_type.model");
const Branch = require("../../models/branch.model");
const { ignoreModel } = require("../../utils/constant");
const SessionStore = require("../../models/store.model");

module.exports = {
	getFoods: async (req, res) => {
		try {
			const { type, query } = req.query;
			const reg = query ? new RegExp(query, "i") : "";
			let data =
				!type || type == "6276897ef868ab574afb3cd2"
					? await Food.getAll()
					: await Food.getFoodWithType(type);

			if (!!reg) {
				data = data.filter((food) => reg.test(food.name));
			}

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
};
