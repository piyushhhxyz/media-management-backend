const { default: mongoose } = require("mongoose");
const nodemailer = require("nodemailer")
require("dotenv").config()

const fileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    },
})

fileSchema.post("save", async(doc) => {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST ,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS 
            }
        })
    let info = await transporter.sendMail({
        from: "Bhawsar Baba" ,
        to: doc.email,
        subject: "Mail Sent From Backend(testing...)",
        html: `<h2>Hello Jee</h2> <p>File Uploaded jee</p> View Here: <a href="${doc.imageUrl}">${doc.imageUrl}</a>` 
    })
    } catch(e) {

        
    }
})

module.exports = mongoose.model("File", fileSchema)