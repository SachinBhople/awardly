
const asyncHandler = require("express-async-handler")
const Auth = require("../model/Auth")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    console.log(req.body);

    const result = await Auth.findOne({ email })
    if (result) {
        return res.status(200).json({ message: "Email Already Register" })
    }

    // const hashPassword = await bcrypt.hash(password, 10)
    // console.log(name, email, password);

    const hashPassword = await bcrypt.hash(password, 10)


    await Auth.create({ ...req.body, password: hashPassword })

    res.status(200).json({ message: "Register Success" })
})

exports.login = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const result = await Auth.findOne({ email })

    if (!result) {
        return res.status(400).json({ message: "Invaild Email" })
    }

    const verify = await bcrypt.compare(password, result.password)

    if (!verify) {
        return res.status(400).json({ message: "Ivalid Password" })
    }


    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })

    res.cookie("auth", token, { httponly: true, maxAge: 1000 * 60 * 60 * 24 })

    res.status(200).json({
        message: "Login Success", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            role: result.role

        }
    })


})

exports.logout = asyncHandler(async (req, res) => {
    res.clearCookie("auth")
    res.status(200).json({ message: "logout success" })
})