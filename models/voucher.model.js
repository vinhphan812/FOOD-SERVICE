const { SCHEMA_OPTION, ignoreModel, makeQuery } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const VoucherSchema = new Schema(
	{
		name: String,
		icon: String,
		code: String,
		description: String,
		voucher_type: {
			type: String,
			enum: ["SHIPPING", "USING"],
		},
		discount_type: { type: String, enum: ["MONEY", "PERCENT"] },
		discount: Number,
		max_used: Number,
		used: Number,
		valid_date: { type: Date, default: new Date().setHours(24) },
		min_price: { type: Number, default: 0 },
		max_price: { type: Number, default: 0 },
		is_delete: Boolean,
	},
	SCHEMA_OPTION
);

VoucherSchema.static({
	getValid: async function () {
		const vouchers = await this.find(makeQuery(), ignoreModel());
		return vouchers.reduce((r, v) => {
			if (v.checkValid()) r.push(v);
			return r;
		}, []);
	},
});

VoucherSchema.method({
	checkValid: function () {
		const curDate = new Date();
		return this.used < this.max_used && this.valid_date > curDate;
	},
	checkVoucherType: function (type) {
		if (!this.checkValid()) return "VOUCHER_INVALID";

		return this.voucher_type == type
			? "VOUCHER_CHECK_PASSED"
			: "VOUCHER_CHECK_FAILED";
	},
	discountVoucher: function (price) {
		let discountPrice = 0;
		if (this.min_price > price) return "PRICE_NOT_ENOUGH_USING_VOUCHER";

		if (this.discount_type == "MONEY") {
			discountPrice = this.discount;
		} else {
			// type == Percent
			let discount = price * (this.discount / 100);

			discountPrice =
				this.max_price == 0 || this.max_price >= discount
					? discount
					: this.max_price;
		}
		return discountPrice;
	},
});

const Voucher = mongoose.model("VOUCHERS", VoucherSchema, "VOUCHERS");

module.exports = Voucher;
