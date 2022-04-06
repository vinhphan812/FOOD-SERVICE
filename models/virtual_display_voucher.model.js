const { SCHEMA_OPTION } = require("../utils/constant");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const VirtualDisplayVoucherSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: "USER" },
		voucher_id: { type: Schema.Types.ObjectId, ref: "VOUCHERS" },
	},
	SCHEMA_OPTION
);

// method query
VirtualDisplayVoucherSchema.static({
	myVouchers: async function (id) {
		const vouchers = await this.find({
			user_id: id,
		}).populate("voucher_id");

		return vouchers.reduce(
			(r, { voucher_id: v }) => {
				if (v.checkValid()) r[v.voucher_type].push(v);
				return r;
			},
			{ SHIPPING: [], USING: [] }
		);
	},
});

const VirtualDisplayVoucher = mongoose.model(
	"VIRTUAL_DISPLAY_VOUCHER",
	VirtualDisplayVoucherSchema,
	"VIRTUAL_DISPLAY_VOUCHER"
);

module.exports = VirtualDisplayVoucher;
