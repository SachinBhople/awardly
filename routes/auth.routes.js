const authController = require("../controller/auth.controller")

const router = require("express").Router()


router

    .post("/register", authController.register)
    .post("/login", authController.login)
    .post("/logout", authController.logout)

module.exports = router      