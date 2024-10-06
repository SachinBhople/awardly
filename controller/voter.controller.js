const asyncHandler = require("express-async-handler")
const Vote = require("../model/Vote");
const Nomination = require("../model/Nomination");


// exports.addVoter = asyncHandler(async (req, res) => {
//     console.log(req.user);
//     await Vote.create({ ...req.body, userId: req.user })

//     res.status(200).json({ message: "vote Added Succes" })
// })


exports.addVoter = asyncHandler(async (req, res) => {
    // console.log(req.user);
    // console.log(req.body);
    // console.log(req.user);
    const { categorires, name, userId, _id } = req.body
    // console.log(voteData._id);

    const alreadyVote = await Vote.findOne({ userId, categorires, nominationId: _id })
    console.log(alreadyVote);

    if (alreadyVote) {
        return res.status(400).json({ message: "You have already voted for this nomination." })
    }
    // Create a new vote and associate it with the user
    const newVote = await Vote.create({ categorires, name, userId, nominationId: _id });
    // console.log(newVote)

    // Increment the vote count in the corresponding nomination

    console.log(req.body);

    await Nomination.findByIdAndUpdate(req.body._id, {
        $inc: { voteCount: 1 }
    });

    res.status(200).json({ message: "Vote Added Successfully", newVote });
});
exports.getAllVoter = asyncHandler(async (req, res) => {
    const result = await Vote.find()
    res.status(200).json({ message: "vote Fetch Succes", result })
})
exports.deleteVoter = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Vote.findByIdAndDelete(id)
    res.status(200).json({ message: "vote Delete Succes" })
})
exports.updateVoter = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Vote.findByIdAndUpdate(id, req.body)
    res.status(200).json({ message: "vote update Succes" })
})