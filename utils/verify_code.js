module.exports = function () {
	let verifyCode = "";

	while (verifyCode.length < 6) verifyCode += randomNumber();

	return verifyCode;
};

function randomNumber() {
	return Math.floor(Math.random() * (9 - 0 + 1) + 0);
}
