require("dotenv").config();
const express = require("express");
const PORT = process.env.port;

const apiRoute = require("./api/routers/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoute);

app.get("/", (req, res) => {
	res.send("Service api Foodzie");
});

app.listen(PORT, () => {
	console.log("server run in port " + PORT);
});
