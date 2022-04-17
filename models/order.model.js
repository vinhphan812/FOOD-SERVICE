const {
	SCHEMA_OPTION,
	checkInvalidID,
	ignoreModel,
} = require("../utils/constant");

const mongoose = require("mongoose");

const SessionStore = require("./session_store.model");
const OrderDetail = require("./order_detail.model");
const Voucher = require("./voucher.model");
const Food = require("./food.model");

const { Schema } = mongoose;

const OrderSchema = new Schema(
	{
		total_foods: Number,
		order_date: { type: Date, default: new Date() },
		voucher_ship: { type: Schema.Types.ObjectId, ref: "VOUCHER" },
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
		sessionId,
		user,
		branch,
		note,
		voucher_ship,
		voucher_using
	) {
		const DEFAULT_SHIPPING_FEE = 25000;

		const data = await SessionStore.getCart(sessionId);

		if (!data.length)
			return { success: false, message: "FOOD_ORDER_IS_EMPTY" };

		// check id
		if (
			(voucher_ship && checkInvalidID(voucher_ship)) ||
			(voucher_using && checkInvalidID(voucher_using))
		)
			return { success: false, message: "VOUCHER_ID_INVALID" };

		voucher_ship = await Voucher.findOne({ _id: voucher_ship });
		voucher_using = await Voucher.findOne({ _id: voucher_using });

		// check voucher valid & type
		const voucherShipCheck =
			voucher_ship && voucher_ship.checkVoucherType("SHIPPING");

		const voucherUsingCheck =
			voucher_using && voucher_using.checkVoucherType("USING");

		if (voucher_ship && voucherShipCheck != "VOUCHER_CHECK_PASSED")
			return {
				success: false,
				message: "VOUCHER_SHIP_" + voucherShipCheck,
			};

		if (voucher_using && voucherUsingCheck != "VOUCHER_CHECK_PASSED")
			return {
				success: false,
				message: "VOUCHER_USING_" + voucherUsingCheck,
			};

		//create order
		const myOrder = await this.create({
			branch,
			note,
			user,
			shipping_fee: DEFAULT_SHIPPING_FEE,
		});

		// make order detail
		await OrderDetail.create(
			data.map((e) => ({
				order_id: myOrder.id,
				...e,
			}))
		);

		let total_foods = 0;

		for (const { food_id: _id, quantity } of data) {
			const food = await Food.findOne({ _id });
			total_foods += food.price * quantity;
		}

		const discountShip = voucher_ship
			? voucher_ship.discountVoucher(DEFAULT_SHIPPING_FEE)
			: 0;

		const discountUsing = voucher_using
			? voucher_using.discountVoucher(total_foods)
			: 0;

		if (typeof discountShip == "string") {
			await Order.deleteOne({ _id: myOrder.id });
			return { success: false, message: discountShip };
		}

		if (typeof discountUsing == "string") {
			await Order.deleteOne({ _id: myOrder.id });
			return { success: false, message: discountUsing };
		}

		const total = total_foods - discountUsing - discountShip;

		await Order.updateOne(
			{ _id: myOrder.id },
			{ $set: { total_foods, total } }
		);

		//TODO: create NOTIFICATION

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
		order._doc.details = await OrderDetail.find(
			{ order_id: order.id },
			ignoreModel(["created_at", "updated_at", "order_id", "_id"])
		).populate("food_id");
		return order;
	},
});

const Order = mongoose.model("ORDER", OrderSchema, "ORDER");

module.exports = Order;
