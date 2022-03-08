module.exports.ignoreModel = function (ignoreKeys, isDeleteIgnore = true) {
	const ignore = { is_delete: +!isDeleteIgnore };
	for (const key of ignoreKeys) ignore[key] = 0;
	return ignore;
};
