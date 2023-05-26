const express = require("express")
const router = require("./routes/fileUpload")
const { dbConnect } = require("./config/database")
const app = express()

app.use(express.json())

app.use("/api/v1",router)

const PORT = process.env.PORT || 3000
app.listen(PORT , console.log(`Server Started @ ${PORT}`))

dbConnect()

app.get("/" , (req,res)=>res.send("<h1>This is HomePage Baby</h1>"))