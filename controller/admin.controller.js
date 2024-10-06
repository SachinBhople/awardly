
const asyncHandler = require("express-async-handler");
const Nomination = require("../model/Nomination");

// exports.getWinner = asyncHandler(async (req, res) => {
//     // Fetch all nominations with their vote counts
//     const nominations = await Nomination.find().select('name voteCount userId categorires').populate("userId");


//     if (nominations.length === 0) {
//         return res.status(404).json({ message: "No nominations found." });
//     }


//     // Find the nomination with the maximum votes
//     const winner = nominations.reduce((prev, current) => {
//         return (prev.voteCount > current.voteCount) ? prev : current;
//     });

//     // Optional: Check for ties
//     const winners = nominations.filter(nom => nom.voteCount === winner.voteCount);

//     console.log(winners);


//     res.status(200).json({
//         message: winners.length > 1 ? "It's a tie!" : "Winner found!",
//         winners
//     });
// });



exports.getWinner = asyncHandler(async (req, res) => {
    // Fetch all nominations with their vote counts, and populate the userId field
    const nominations = await Nomination.find().select('name voteCount userId categorires').populate("userId");

    if (nominations.length === 0) {
        return res.status(404).json({ message: "No nominations found." });
    }

    // Initialize an object to store the winners by category
    const categoryWinners = {};

    // Loop over all nominations
    nominations.forEach(nomination => {
        nomination.categorires.forEach(category => {
            // If the category doesn't exist in categoryWinners, initialize it
            if (!categoryWinners[category]) {
                categoryWinners[category] = [];
            }
            // Push the nomination to the relevant category
            categoryWinners[category].push(nomination);
        });
    });

    // Find the winner in each category
    const winners = {};
    Object.keys(categoryWinners).forEach(category => {
        const nominationsInCategory = categoryWinners[category];
        const maxVoteCount = Math.max(...nominationsInCategory.map(n => n.voteCount));

        // Get all nominations with the maximum vote count in this category (to account for ties)
        const categoryWinner = nominationsInCategory.filter(n => n.voteCount === maxVoteCount);

        winners[category] = {
            message: categoryWinner.length > 1 ? "It's a tie!" : "Winner found!",
            winner: categoryWinner
        };
    });

    // Send the response with winners for each category
    // console.log("categaryy", categoryWinner);
    console.log("winndner", winners);


    res.status(200).json({
        message: "Winners found for all categories.",
        winners
    });
});
