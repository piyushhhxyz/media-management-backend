const express = require("express")
const router = require("./routes/fileUpload")
const { dbConnect } = require("./config/database")
const cloudinary = require("./config/cloudinary")
const app = express()

app.use(express.json())

const fileUpload = require("express-fileupload")
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

app.use("/api/v1",router)

const PORT = process.env.PORT || 3000
app.listen(PORT , console.log(`Server Started @${PORT}`))

dbConnect()
cloudinary.cloudinaryConnect()

app.get("/" , (req,res)=>res.send("<h1>This is HomePage Baby</h1>"))