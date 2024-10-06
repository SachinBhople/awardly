const awardController = require("../controller/award.controller")


const router = require("express").Router()

    .get("/awards", awardController.getAllAward)
    .post("/add-award", awardController.addAward)
    .delete("/delete-award/:id", awardController.deleteAward)
    .put("/update-award/:id", awardController.updateAward)


module.exports = router