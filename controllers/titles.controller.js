const utils = require("../utils");
const {StatusCodes} = require("http-status-codes");
const titleService = require("../services/index");
const baseResponse = require("../dto/baseresponse.dto");


exports.getAllTitles=async (req,res)=>{
    try {
        const json = await titleService.title.listTitles()
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
exports.getTitlesById=async (req,res)=>{
    try {
        const json = await titleService.title.findTitleById(req)
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
exports.getPersonsById=async (req,res)=>{
    try {
        const json = await titleService.title.findPersonById(req)
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
exports.createTitle=async (req,res)=>{
    try {
        const isInvalid=utils.helpers.handleValidation(req)
        if (isInvalid){
            res.status(StatusCodes.BAD_REQUEST).json({...isInvalid})
        }

        const json = await titleService.title.createTitle(req)
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
exports.updateTitle=async (req,res)=>{
    try {
        const isInvalid=utils.helpers.handleValidation(req)
        if (isInvalid){
            res.status(StatusCodes.BAD_REQUEST).json({...isInvalid})
        }

        const json = await titleService.title.updateTitles(req)
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
exports.deleteTitleById=async (req,res)=>{
    try {
        const json = await titleService.title.deleteTitleById(req)
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
