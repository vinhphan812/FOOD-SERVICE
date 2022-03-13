// environment config from .env
require("dotenv").config();

// import module
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// import route
const apiRoute = require("./api/routers/index.route");
const authRoute = require("./api/routers/auth.route");

//import middleware
const sessionMiddleware = require("./middlewares/session.middleware");

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
app.use(sessionMiddleware);

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
	console.log("server run in port " + PORT);
});
