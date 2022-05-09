// environment config from .env
require("dotenv").config();

//require all model
require("./models/require.model");

// import modules
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { networkInterfaces } = require("os");

const admin = require("firebase-admin");

const { getMessaging } = require("firebase-admin/messaging");
const serviceAccount = require("./food-services-1de98-firebase-adminsdk-b0y0g-92b348c858.json");

// import route
const apiRoute = require("./api/routers/index.route");
const authRoute = require("./api/routers/auth.route");

// get PORT
const PORT = process.env.port || 3000;

// connect database from .env
if (process.env.db_url)
	mongoose.connect(process.env.db_url, {
		connectTimeoutMS: 500,
	});

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

// getMessaging()
// 	.send({
// 		notification: { title: "Price drop", body: "5% off all electronics" },
// 		token: "e3TW3MfMSYSvTtQV9sqHml:APA91bHYcnNCYl0EvXhLtqxJ01dSlxmrgcjOGwd3oBvAL1t5e8ZRRkfdEroGGy8e9Ct03TSUWqp8pnWjhnvuRlym6OZD1OkaWke9NjyzX-I7NTXbM7IfJ9cYcT1-lyP7Vg8df31znbHJ",
// 	})
// 	.then(console.log);

// init app
const app = express();

// use cookies
app.use(cookieParser(process.env.SECRET_KEY));

// use middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// use route
app.use("/api", apiRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
	res.send("Service api Foodzie");
});

app.use((req, res, next) => {
	res.json({ success: false, message: "NOT_FOUND" });
});

app.listen(PORT, () => {
	const nets = networkInterfaces();

	console.log(`server run in http:\/\/${nets["Wi-Fi"][1].address}:${PORT}`);
});
