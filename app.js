const express = require("express")
const configs = require("./configs/index")
const db = require("./db/index")
const {default:helmet} = require("helmet");
const cors = require("cors");
const router = require("./router/index")
const consts=require("./consts/index")
const middleWares = require("./middleware/index")
const utils = require("./utils/index")

configs.serverConfig.initialserverConfig()


const PORT = process.env.PORT || 5000
const app = express()

utils.helpers.createUploadDir("./uploads")

app.use("/uploads",express.static("uploads"))


app.use(helmet())
app.use(cors())
app.use(express.urlencoded())
app.use(express.json())

app.use(middleWares.loggerMW)
app.use(middleWares.authMW)

app.use(`${process.env.APP_PREFIX}${consts.router.COMMON}`,router.commonRouter.common)
app.use(`${process.env.APP_PREFIX}${consts.router.COMPANY}`,router.companyRouter.company)
app.use(`${process.env.APP_PREFIX}${consts.router.PERSON}`,router.personRouter.person)
app.use(`${process.env.APP_PREFIX}${consts.router.TITLES}`,router.titlesRouter.titles)
app.use(`${process.env.APP_PREFIX}${consts.router.AUTH}`,router.authRouter.auth)


db.mongooseConnections.connectToMongoDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`${process.env.PORT} Port Online`)
    })
})




