const commonService=require("../services/index")
const baseResponse = require("../dto/baseresponse.dto")
const {StatusCodes} = require("http-status-codes")
const utils = require("../utils/index")

exports.getAllCountry=(req,res)=>{
    const _response = {...baseResponse}
    try {
        const json = commonService.common.getAllContries(req,res)
        res.json({..._response,
            data:json,
            error:false,
            success:true,
            timestamps:Date.now(),
            code:StatusCodes.OK})
    }
    catch (error) {
        utils.helpers.logToError(error,req)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({..._response,
            success:false,
            error:true,
            timestamps:Date.now(),
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:error.message
        })
    }

}

exports.getCityByCountryId=(req,res)=>{
    try {
        const {countryId}=req.params
        const isInvalid=utils.helpers.handleValidation(req)
        if (isInvalid){
            res.status(StatusCodes.BAD_REQUEST).json({...isInvalid})
        }
        const json = commonService.common.getCityByCountryId(countryId)
        res.json({...baseResponse,
            error:false,
            success:true,
            timestamps:Date.now(),
            code:StatusCodes.OK,
            data:json
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