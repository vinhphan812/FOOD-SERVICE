const {
	SCHEMA_OPTION,
	checkInvalidID,
	ignoreModel,
	DEFAULT_SHIPPING_FEE,
} = require("../utils/constaints");

const mongoose = require("mongoose");

const Store = require("./store.model");
const OrderDetail = require("./order_detail.model");
const Voucher = require("./voucher.model");
const Food = require("./food.model");

const { Schema } = mongoose;

const OrderSchema = new Schema(
	{
		total_foods: Number,
		order_date: { type: Date, default: new Date() },
		voucher_using: { type: Schema.Types.ObjectId, ref: "VOUCHER" },
		is_delete: { type: Boolean, default: false },
		delivery: String,
		user: { type: Schema.Types.ObjectId, ref: "USER" },
		branch: { type: Schema.Types.ObjectId, ref: "BRANCH" },
		status: {
			type: String,
			default: "PENDING",
			enum: ["PENDING", "PREPARE", "SHIPPING", "DONE", "CANCEL"],
		},
		note: String,
		shipping_fee: { type: Number, default: 0 },
		total: Number,
	},
	SCHEMA_OPTION
);

OrderSchema.static({
	createOrder: async function (
		user,
		branch,
		note,
		voucher_using,
		shipping_fee,
		delivery
	) {
		const data = await Store.getCart(user);

		if (!data.length)
			return { success: false, message: "FOOD_ORDER_IS_EMPTY" };

		// check id
		if (voucher_using && checkInvalidID(voucher_using))
			return { success: false, message: "VOUCHER_ID_INVALID" };

		voucher_using = await Voucher.findOne({ _id: voucher_using });

		//create order
		const myOrder = await this.create({
			branch,
			note,
			user,
			shipping_fee: shipping_fee || DEFAULT_SHIPPING_FEE,
			delivery,
		});

		// make order detail
		await OrderDetail.create(
			data.map((e) => ({
				order_id: myOrder.id,
				food_id: e._doc._id,
				quantity: e._doc.quantity
			}))
		);

		let total_foods = 0,
			total = 0;

		for (const { _doc } of data) {
			const { price, quantity } = _doc;
			total_foods += price * quantity;
		}

		if (voucher_using) {
			const discount = await Voucher.checkValidAndDiscount(
				voucher_using.id,
				total_foods,
				shipping_fee
			);

			if (!discount.success) {
				await Order.deleteOne({ _id: myOrder.id });
				await OrderDetail.deleteMany({ order_id: myOrder.id });
				return { success: false, message: discount.message };
			}

			total = discount.data.price + discount.data.shipping_fee;
		} else total = shipping_fee + total_foods;

		await Order.updateOne(
			{ _id: myOrder.id },
			{ $set: { total_foods, total } }
		);

		//TODO: create NOTIFICATION

		Store.clearCart(user);

		return {
			success: true,
			message: "ORDER_CREATED_SUCCESS",
			total,
			order_id: myOrder.id,
		};
	},
	getOrders: async function (user) {
		const orders = await this.find({ user }, ignoreModel());

		return orders;
	},
	getOrderDetail: async function (_id) {
		const order = await this.findOne({ _id });
		const data = await OrderDetail.find(
			{ order_id: order.id },
			ignoreModel(["created_at", "updated_at", "order_id", "_id"])
		).populate({path: "food_id", populate: "type"});
		
		order._doc.details = data.map((e) =>{	
			return {...e.food_id._doc, quantity: e.quantity};
		})
		return order;
	},
});

const Order = mongoose.model("ORDER", OrderSchema, "ORDER");

module.exports = Order;
