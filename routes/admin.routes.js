const adminController = require("../controller/admin.controller");

const router = require("express").Router()

    .get("/get-winner", adminController.getWinner)

module.exports = router