const moment = require("moment");

const SCHEMA_OPTION = {
	versionKey: false,
	minimize: false,
	timestamps: {
		createdAt: "created_at",
		updatedAt: "updated_at",
	},
};

const TAKE_SUCCESS_VOUCHER = "Lấy Mã Giảm Giá Thành Công!";
const TAKE_VOUCHER_HREF = (voucherId) => "VOUCHER/" + voucherId;

const MAKE_BODY_MESSAGE_TAKE_VOUCHER = (voucher) =>
	`Bạn đã nhận được voucher giảm ${makeContentDiscount(voucher)} ${
		voucher.voucher_type == "SHIPPING" ? "phí ship" : "giá đơn hàng"
	} hạn sử dụng đến ${moment(voucher.valid_date).format("DD/MM/yyyy")}`;

function makeContentDiscount(voucher) {
	return voucher.discount_type == "MONEY"
		? voucher.discount + "đ"
		: `${voucher.discount}% ${
				voucher.max_price != 0
					? `giảm tối đa ${voucher.max_price}đ`
					: ""
		  }`;
}

const ignoreModel = function (ignoreKeys = [], isDeleteIgnore = true) {
	const ignore = { is_delete: +!isDeleteIgnore };
	for (const key of ignoreKeys) ignore[key] = 0;
	return ignore;
};
const makeQuery = (query = {}, is_delete = false) => {
	query.is_delete = is_delete;
	return query;
};

const checkInvalidID = (id) => id.length != 24;

const morganConfig = `:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms`;

const DEFAULT_SHIPPING_FEE = 25000;

module.exports = {
	DEFAULT_SHIPPING_FEE,
	morganConfig,
	SCHEMA_OPTION,
	TAKE_SUCCESS_VOUCHER,
	ignoreModel,
	makeQuery,
	checkInvalidID,
	MAKE_BODY_MESSAGE_TAKE_VOUCHER,
	TAKE_VOUCHER_HREF,
};
