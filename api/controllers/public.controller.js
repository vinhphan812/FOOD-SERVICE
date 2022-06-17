const { ignoreModel, DEFAULT_SHIPPING_FEE } = require("../../utils/constaints");

const {
	Branch,
	FoodType,
	Food,
	Voucher,
	VirtualDisplayVoucher,
} = require("../../models/require.model");

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
	getVouchersPublic: async (req, res) => {
		const { userId } = req.signedCookies;

		let myVouchers = [];

		if (userId)
			myVouchers = (
				await VirtualDisplayVoucher.find(
					{ user_id: userId },
					{ voucher_id: 1 }
				)
			).map((e) => e.voucher_id.toString());

		let data = await Voucher.getValid();

		if (myVouchers.length) {
			data = data.filter((e) => !myVouchers.includes(e.id));
		}
		res.json({ success: true, data });
	},
	createVoucherTest: async (req, res) => {
		const vouchersData = [
			{
				name: "voucher phí shipper 50% tối đa 25k",
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
				name: "voucher giảm giá 50% tối đa 250.0000 VND",
				icon: "",
				code: "DISCOUNT250k",
				description: "",
				voucher_type: "USING",
				discount_type: "PERCENT",
				discount: 50,
				max_price: 250000,
				max_used: 10,
				used: 5,
				min_price: 500000,
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
				discount: 10000,
				max_used: 10,
				used: 5,
				min_price: 0,
				max_price: 0,
				is_delete: false,
			},
		];

		const voucher = await Voucher.create(vouchersData);

		res.json({ success: true, message: "haha", data: voucher });
	},
	calculatorShippingFee: (req, res) => {
		const { distance } = req.body;

		const fee = parseInt(distance) * 5000;
		res.json({
			success: true,
			data: {
				fee:
					fee > DEFAULT_SHIPPING_FEE
						? fee
						: DEFAULT_SHIPPING_FEE,
			},
		});
	},
};
