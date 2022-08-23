const {body, query,param} = require("express-validator")
const personService=require("../services/index")
const utils = require("../utils/index")
const personValidator = {
    validateCreatePerson(){
        return [
            body("name").not().isEmpty(),
            body("surname").not().isEmpty(),
            body("birthDate").isNumeric(),
            body("gender").not().isEmpty(),
            body("salary").isNumeric(),
            body("tcNumber").isNumeric().isLength({min:11,max:11}).custom(async (value,{req})=>{
                if (utils.helpers.validateTcNumber(value)===false){
                    throw new Error("Geçerli bir tcNo Değildir.")
                }
                return true
            }),
            body("email").not().isEmpty().isEmail().custom(async (value,{req})=>{
                const result = await personService.person.findByEmail(value)
                if (result){
                    throw new Error("email adresi kullanimda")
                }
                //işlemler
            }),
            body("password").not().isEmpty(),
            body("password").isLength({min:8,max:30}),
            body("country").not().isEmpty(),
            body("city").not().isEmpty(),
            body("company").isMongoId(),
            body("title").isMongoId(),

        ]
    },
    validateAvatar(){
        return [query("id").isMongoId()]
    },
    validateUpdateAvatar(){
        return [query("id").isMongoId()]
    },
    validateCv(){
        return [query("id").isMongoId()]
    },
    validateUpdateCv(){
        return [query("id").isMongoId()]
    },
    validateGetCompany(){
        return [param("id").isMongoId()]
    },
    validateGetTitle(){
        return [param("id").isMongoId()]
    },
    validateGetPersonById(){
        return [param("id").isMongoId()]
    },
    validateDeleteById(){
        return [query("id").isMongoId()]
    },
    validateSignIn() {
        return [
            body('email').not().isEmpty().isEmail(),
            body('password').not().isEmpty(),
            body('password').isLength({ min: 8, max: 30 }),
        ]
    },
    validateListPagination(){
        return [
            query("perPage").isNumeric(),
            query("page").isNumeric(),
            query("sortBy").not().isNumeric().not().isEmpty(),
            query("sortDirection").not().isEmpty()
        ]


    },
    validateUpdatePerson(){
        return [
            body("name").not().isEmpty(),
            body("surname").not().isEmpty(),
            body("birthDate").isNumeric(),
            body("gender").not().isEmpty(),
            body("salary").isNumeric(),
            body("tcNumber").isNumeric().isLength({min:11,max:11}).custom(async (value,{req})=>{
                if (utils.helpers.validateTcNumber(value)===false){
                    throw new Error("Geçerli bir tcNo Değildir.")
                }
                return true
            }),
            body("email").not().isEmpty().isEmail().custom(async (value,{req})=>{
                const result = await personService.person.findByEmail(value)
                if (result){
                    throw new Error("email adresi kullanimda")
                }
                //işlemler
            }),
            body("password").not().isEmpty(),
            body("password").isLength({min:8,max:30}),
            body("country").not().isEmpty(),
            body("city").not().isEmpty(),
            body("company").isMongoId(),
            body("title").isMongoId(),

        ]
    }

}
module.exports = {
    personValidator
}