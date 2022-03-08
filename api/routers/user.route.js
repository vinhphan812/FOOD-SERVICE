const express = require("express");

const { changeRole } = require("../controllers/user.controller");

const router = express.Router();

// {host:port}/api/user/change-role
router.post("/change-role", changeRole);

module.exports = router;
