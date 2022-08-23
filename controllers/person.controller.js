const utils = require("../utils");
const {StatusCodes} = require("http-status-codes");
const baseResponse = require("../dto/baseresponse.dto");
const personService = require("../services/index")
const personDal = require("../dal/index")




exports.getAllPersons=async (req,res)=>{
    try {
        const json = await personService.person.listPerson()
        res.status(StatusCodes.CREATED).json({...baseResponse,
            data:json,
            success:true,
            timestamps:new Date(),
            code:StatusCodes.CREATED
        })

    }
    catch (error) {
        utils.helpers.logToError(error,req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success:false,
            error:true,
            timestamps:Date.now(),
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:error.message
        })
    }



}
exports.getAllPersonsPagination=async (req,res)=>{
    try {
        const json = await personService.person.listPersonsWithPagination(req)
        res.status(StatusCodes.OK).json({...baseResponse,
            data:json,
            success:true,
            timestamps:new Date(),
            code:StatusCodes.OK
        })

    }
    catch (error) {
        utils.helpers.logToError(error,req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success:false,
            error:true,
            timestamps:Date.now(),
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:error.message
        })
    }



}
exports.getPersonById=async (req,res)=>{
    try {
        const isInvalid=utils.helpers.handleValidation(req)
        if (isInvalid){
            res.status(StatusCodes.BAD_REQUEST).json({...isInvalid})
        }

        const json = await personService.person.getPersonById(req)
        res.status(StatusCodes.OK).json({...baseResponse,
            data:json,
            success:true,
            timestamps:new Date(),
            code:StatusCodes.OK
        })

    }
    catch (error) {
        utils.helpers.logToError(error,req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success:false,
            error:true,
            timestamps:Date.now(),
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:error.message
        })
    }
}
exports.updatePerson=async (req,res)=>{
    try {
        const isInvalid=utils.helpers.handleValidation(req)
        if (isInvalid){
            res.status(StatusCodes.BAD_REQUEST).json({...isInvalid})
        }

        const json = await personService.person.updatePerson(req)
        res.status(StatusCodes.OK).json({...baseResponse,
            data:json,
            success:true,
            timestamps:new Date(),
            code:StatusCodes.OK
        })

    }
    catch (error) {
        utils.helpers.logToError(error,req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success:false,
            error:true,
            timestamps:Date.now(),
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:error.message
        })
    }
}
exports.deletePersonById=async (req,res)=>{
    try {
        const json = await personService.person.deletePersonById(req)
        res.status(StatusCodes.OK).json({...baseResponse,
            data:json,
            success:true,
            timestamps:new Date(),
            code:StatusCodes.OK
        })

    }
    catch (error) {
        utils.helpers.logToError(error,req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success:false,
            error:true,
            timestamps:Date.now(),
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:error.message
        })
    }
}
exports.createPerson=async (req,res)=>{
    try {
        const isInvalid=utils.helpers.handleValidation(req)
        if (isInvalid){
            res.status(StatusCodes.BAD_REQUEST).json({...isInvalid})
        }

        const json = await personService.person.createPerson(req)
        res.status(StatusCodes.CREATED).json({...baseResponse,
            data:json,
            success:true,
            timestamps:new Date(),
            code:StatusCodes.CREATED
        })

    }
    catch (error) {
        utils.helpers.logToError(error,req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success:false,
            error:true,
            timestamps:Date.now(),
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:error.message
        })
    }
}
exports.uploadAvatar = async(req, res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse,
                ...isInvalid
            })
            return
        }
        const json = await personService.person.uploadAvatar(req,res)
        res.status(StatusCodes.OK).json(json)
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}
exports.uploadCv = async(req, res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse,
                ...isInvalid
            })
            return
        }
        const json = await personService.person.uploadCv(req,res)
        res.status(StatusCodes.OK).json(json)
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}
exports.getCompany = async (req,res)=>{
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse,
                ...isInvalid
            })
            return
        }
        const json = await personService.person.getCompany(req,res)
        res.status(StatusCodes.OK).json({...baseResponse,
            data:json,
            success:true,
            timestamps:new Date(),
            code:StatusCodes.OK
        })

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}

exports.signIn=async (req,res)=>{
    try {
        const isInvalid=utils.helpers.handleValidation(req)
        if (isInvalid){
            res.status(StatusCodes.BAD_REQUEST).json({...isInvalid})
        }

        const json = await personService.person.signIn(req)
        res.status(StatusCodes.OK).json({...baseResponse,
            data:json,
            success:true,
            timestamps:new Date(),
            code:StatusCodes.OK
        })

    }
    catch (error) {
        utils.helpers.logToError(error,req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success:false,
            error:true,
            timestamps:Date.now(),
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:error.message
        })
    }
}

exports.getTitle = async (req,res)=>{
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse,
                ...isInvalid
            })
            return
        }
        const json = await personService.person.getTitle(req,res)
        res.status(StatusCodes.OK).json({...baseResponse,
            data:json,
            success:true,
            timestamps:new Date(),
            code:StatusCodes.OK
        })

    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}
exports.updateCv = async(req, res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse,
                ...isInvalid
            })
            return
        }
        const json = await personService.person.updateCv(req)
        res.status(StatusCodes.OK).json(json)
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}
exports.updateAvatar = async(req, res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse,
                ...isInvalid
            })
            return
        }
        const json = await personService.person.updateAvatar(req)
        res.status(StatusCodes.OK).json(json)
    } catch (error) {
        utils.helpers.logToError(error, req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}