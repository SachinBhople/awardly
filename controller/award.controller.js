const asyncHandler = require("express-async-handler")
const Award = require("../model/Award")


exports.addAward = asyncHandler(async (req, res) => {
    // await Award.create(req.body)
    await Award.findByIdAndUpdate()
    res.status(200).json({ message: "Award Added Succes" })
})
exports.getAllAward = asyncHandler(async (req, res) => {
    const result = await Award.find()
    res.status(200).json({ message: "Award Fetch Succes", result })
})
exports.deleteAward = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Award.findByIdAndDelete(id)
    res.status(200).json({ message: "Award Delete Succes" })
})
exports.updateAward = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Award.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: "Award update Succes" })
})