const { SCHEMA_OPTION } = require("../utils/constant");

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
			enum: ["seller", "shipper", "app", "food"],
		},
		discount_type: { type: String, enum: ["money", "percent"] },
		discount: Number,
		max_used: Number,
		used: Number,
		valid_date: Date,
		min_price: Number,
		max_price: Number,
		reference_id: { type: Schema.Types.ObjectId, ref: [] }, // reference id user or
		is_delete: Boolean,
		create_by: { type: Schema.Types.ObjectId, ref: [] },
	},
	SCHEMA_OPTION
);

const Voucher = mongoose.model("VOUCHER", VoucherSchema, "VOUCHER");

module.exports = Voucher;
