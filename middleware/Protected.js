
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

exports.Protected = asyncHandler(async (req, res, next) => {

    if (!req.cookies.auth) {
        return res.status(401).json({ message: "no cookies found" })
    }

    jwt.verify(req.cookies.auth, process.env.JWT_KEY, (err, decode) => {

        if (err) {
            console.log(err);
            return res.status(401).json({ message: "Jwt Error" })
        }
        req.body.userId = decode.userId
        req.user = decode.userId

        next()

    })

})