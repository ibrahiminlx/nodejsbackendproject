const {param} = require("express-validator")

const commonValidator = {
    validateCountryById(){
        return [param("countryId").isLength({min:1,max:4}).withMessage("Gecersiz Id Bicimi")]
    }
}
module.exports = {
    commonValidator
}