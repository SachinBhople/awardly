const voterController = require("../controller/voter.controller")
const { Protected } = require("../middleware/Protected")



const router = require("express").Router()

    .get("/voter", voterController.getAllVoter)
    .post("/add-vote", Protected, voterController.addVoter)
    .delete("/delete-vote/:id", voterController.deleteVoter)
    .put("/update-vote/:id", voterController.updateVoter)


module.exports = router