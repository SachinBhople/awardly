const asyncHandler = require("express-async-handler")
const Nomination = require("../model/Nomination")


exports.addNomination = asyncHandler(async (req, res) => {
    const { voteCount, name, categorires } = req.body
    await Nomination.create({ voteCount, name, categorires, userId: req.user })
    res.status(200).json({ message: "Nomination Added Succes" })
})
exports.getAllNomination = asyncHandler(async (req, res) => {
    const result = await Nomination.find().populate("userId")
    res.status(200).json({ message: "Nomination Fetch Succes", result })
})
exports.deleteNomination = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Nomination.findByIdAndDelete(id)
    res.status(200).json({ message: "Nomination Delete Succes" })
})
exports.updateNomination = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Nomination.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: "Nomination update Succes" })
})




