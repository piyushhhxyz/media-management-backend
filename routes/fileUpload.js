const express = require("express")
const { localFileUpload, imageUpload, videoUpload, imageSizeReducer } = require("../controller/fileUpload")
const router = express.Router()

router.post("/localFileUpload",localFileUpload)
router.post("/imageUpload",imageUpload)
router.post("/videoUpload",videoUpload)
router.post("/imageSizeReducer",imageSizeReducer)

module.exports = router