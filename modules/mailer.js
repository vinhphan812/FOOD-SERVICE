const nodemailer = require("nodemailer");

module.exports = class Mailer {
	static init() {
		return new Promise(async (resolve, reject) => {
			try {
				this.testAccount = await nodemailer.createTestAccount();
				this.transporter = nodemailer.createTransport({
					service: "Gmail",
					auth: {
						user: process.env.email,
						pass: process.env.pass,
					},
				});
				resolve(this);
			} catch (error) {
				reject(error);
			}
		});
	}
	static sendMail(mailReceives, subject, html) {
		return new Promise(async (resolve, reject) => {
			try {
				if (mailReceives.length == 0)
					return reject({
						success: false,
						message: "NOT_RECEIVER",
					});

				await this.transporter.sendMail({
					to: mailReceives,
					subject,
					html,
				});

				resolve({ success: true, message: "SEND_MAIL_SUCCESS" });
			} catch ({ message }) {
				reject({ success: false, message });
			}
		});
	}
};
