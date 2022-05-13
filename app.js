// environment config from .env
require("dotenv").config();

//require all model
require("./models/require.model");

// import modules
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const admin = require("firebase-admin");

const { getMessaging } = require("firebase-admin/messaging");
const serviceAccount = require("./food-services-1de98-firebase-adminsdk-b0y0g-92b348c858.json");

// import route
const apiRoute = require("./api/routers/index.route");
const authRoute = require("./api/routers/auth.route");

const { db_url, db_user, db_pass, db_name, SECRET_KEY } = process.env;

// get PORT
const PORT = process.env.port || 3000;

// connect database from .env
if (db_url)
	mongoose.connect(db_url, {
		user: db_user,
		pass: db_pass,
		dbName: db_name,
		connectTimeoutMS: 500,
	});

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

// init app
const app = express();

// use cookies
app.use(cookieParser(SECRET_KEY));

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
	console.log(`server run in port ${PORT}`);
});
