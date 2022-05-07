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
