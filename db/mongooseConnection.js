const mongoose = require("mongoose")
const logger = require("../utils/index")

exports.connectToMongoDb=async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL,{useUnifiedTopology: true , useNewUrlParser:true })
        logger.logger.info("connected To do Mongo Db")
        // console.log("veri tabanına bağlanildi")
    }
    catch (e) {
        logger.logger.info(`Error ${e.message}`)
        throw new Error(e.message)
    }
}