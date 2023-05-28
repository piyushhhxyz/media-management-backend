const express = require("express")
const { localFileUpload, imageUpload, videoUpload } = require("../controller/fileUpload")
const router = express.Router()

router.post("/localFileUpload",localFileUpload)
router.post("/imageUpload",imageUpload)
router.post("/videoUpload",videoUpload)

module.exports = router