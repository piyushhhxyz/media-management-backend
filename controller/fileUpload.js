const cloudinary = require("cloudinary").v2
const File = require("../models/file")

exports.localFileUpload = async(req,res) => {
    try{
        const file = req.files.file 
        console.log(file)
        let path = __dirname+"/files/"+Date.now()+ `.${file.name.split(".").pop()}`
        console.log(path)
        file.mv(path, e => console.log(e)) 
        res.json({
            success: true ,
            message: "Local File Uploaded Successfully"
        })
    } catch(e) {
        res.json({
            success: false ,
            message: "Local File Upload Failed"
        })
    }
}

async function uploadFileToCloudinary(file, folder){
    const options = {folder}
    options.resource_type = "auto"
    console.log("tempFilePath",file.tempFilePath)
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

exports.imageUpload = async(req,res) => {
    try{
        const {name,tags,email} = req.body 
        const file = req.files.imageFile
        //validation
        const supportedTypes = ["jpg","jped","png"]
        const fileType = (file.name.split(".").pop()).toLowerCase()
        if(!supportedTypes.includes(fileType)) {
            return res.status(400).json({
                success: false ,
                message: "File Not Supported"
            })
        }
        console.log("heyy")
        const response = await uploadFileToCloudinary(file,"Bhawsar")
        console.log("response",response)
        //db mai entry 
        const fileCreate = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })
        res.status(200).json({
            success: true ,
            imageUrl: response.secure_url ,
            message: "Image Successfully Uploaded"
        })
    }catch(e){
        return res.status(500).json({
            success: false ,
            message: "Error Occured While Uploading"
        })
    }
}

exports.videoUpload =  async(req,res) => {
    try{
        const {name,tags,email} = req.body 
        const file = req.files.videoFile
        //validation
        const supportedTypes = ["mp4","mov"]
        const fileType = (file.name.split(".").pop()).toLowerCase()
        if(!supportedTypes.includes(fileType)) {
            return res.status(400).json({
                success: false ,
                message: "File Format Not Supported"
            })
        }
        const response = await uploadFileToCloudinary(file,"Bhawsar")
        console.log("response",response)
        //db mai entry 
        const fileCreate = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })
        res.status(200).json({
            success: true ,
            imageUrl: response.secure_url ,
            message: "Video Successfully Uploaded"
        })
    }catch(e){
        return res.status(500).json({
            success: false ,
            message: "Error Occured While Uploading Video"
        })
    }
}