const utils = require("../utils/index")
const {StatusCodes} = require("http-status-codes");
const baseResponse = require("../dto/baseresponse.dto");
const companyService = require("../services/index")
const companyDal = require("../dal/index")



exports.getAllCompany=async (req,res)=>{
    try {
        const json = await companyService.company.listCompany()
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
exports.getCompanyById=async (req,res)=>{
    try {
        const json = await companyService.company.findCompanyById(req)
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
exports.createCompany=async (req,res)=>{
    try {
        const isInvalid=utils.helpers.handleValidation(req)
        if (isInvalid){
            res.status(StatusCodes.BAD_REQUEST).json({...isInvalid})
        }

        const json = await companyService.company.createCompany(req)
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
exports.getPersonsById=async (req,res)=>{
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse,
                ...isInvalid
            })
            return
        }
        const json = await companyService.company.getPersonsById(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK })
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
exports.updateCompany=async (req,res)=>{
    try {
        const isInvalid=utils.helpers.handleValidation(req)
        if (isInvalid){
            res.status(StatusCodes.BAD_REQUEST).json({...isInvalid})
        }

        const json = await companyService.company.updateCompany(req)
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
exports.deleteCompanyById=async (req,res)=>{
    try {
        const json = await companyService.company.deleteCompanyById(req)
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
exports.updateLogo=async (req,res)=>{
    try {
        const isInvalid=utils.helpers.handleValidation(req)
        if (isInvalid){
            res.status(StatusCodes.BAD_REQUEST).json({...isInvalid})
            return
        }
        const {id}=req.query
        const str = await companyService.company.updateLogo(req,res)
        const json = await companyDal.company.updateByID(id,{logo:str})
        res.status(StatusCodes.OK).json(json
            // {...baseResponse,
            // data:json,
            // success:true,
            // timestamps:new Date(),
            // code:StatusCodes.CREATED
            // }
        )
        return json
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
exports.uploadLogo = async(req, res) => {
    try {
        const isInvalid = utils.helpers.handleValidation(req)
        if (isInvalid) {
            res.status(StatusCodes.BAD_REQUEST).json({...baseResponse,
                ...isInvalid
            })
            return
        }
        const json = await companyService.company.uploadLogo(req,res)
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