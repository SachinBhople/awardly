const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")
require("dotenv").config({ path: "./.env" })

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: true, credentials: true }))

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/award", require("./routes/award.routes"))
app.use("/api/admin", require("./routes/admin.routes"))
app.use("/api/nomination", require("./routes/nominatin.routes"))
app.use("/api/vote", require("./routes/voter.routes"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "resource not found" })
    // res.sendFile(path.join(__dirname, "dist", "index.html"))
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: err.massage || "something went wrong" })
})

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("mongodb Connected")
    app.listen(process.env.PORT, console.log("server Running"))
})