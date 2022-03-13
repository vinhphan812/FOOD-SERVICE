module.exports.makeQuery = (query = {}, is_delete = false) => {
	query.is_delete = is_delete;
	return query;
};
