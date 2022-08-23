const utils = require("../utils/index")
const upload = require("../middleware/singlefileupload.MW")
const uploadcv = require("../middleware/singlecvupload.MW")
const multer = require("multer")


exports.uploadImage = (req, res) => {
    return new Promise((resolve, reject) => {
        upload(req, res, async(err) => {
            if (err instanceof multer.MulterError) {
                reject(err)
            } else if (err) {
                reject(err)
            }
            const ip = await utils.helpers.getHost()
            const filePath = process.env.FILE_PATH
            const fileName = req.file.filename
            const fileString = `${ip}${filePath}${fileName}`
            resolve(fileString)

        })
    })
}
exports.uploadCv = (req, res) => {
    return new Promise((resolve, reject) => {
        uploadcv(req, res, async(err) => {
            if (err instanceof multer.MulterError) {
                reject(err)
            } else if (err) {
                reject(err)
            }
            const ip = await utils.helpers.getHost()
            const filePath = process.env.FILE_PATH
            const fileName = req.file.filename
            const fileString = `${ip}${filePath}${fileName}`
            resolve(fileString)

        })
    })
}

