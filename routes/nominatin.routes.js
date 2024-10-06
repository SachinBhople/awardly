const nominationController = require("../controller/nomination.controller")
const { Protected } = require("../middleware/Protected")


const router = require("express").Router()

    .get("/nomination", nominationController.getAllNomination)
    .post("/add-nomination", Protected, nominationController.addNomination)
    .delete("/delete-nomination/:id", nominationController.deleteNomination)
    .put("/update-nomination/:id", nominationController.updateNomination)


module.exports = router