const {body, query,param} = require("express-validator")

const titleValidator = {
    validateCreateTitle(){
        return [
            body("name").not().isEmpty(),

        ]
    },
    validateFindById(){
        return [
            param("id").isMongoId()
        ]
    },
    validateGetPersonsById(){
        return [
            param("id").isMongoId()
        ]
    },
    validateUpdateTitleById(){
        return [
            body("name").not().isEmpty(),
            param("id").isMongoId()
        ]
    },
    validateDeleteById(){
        return [
            query("id").isMongoId()
        ]
    }

}
module.exports = titleValidator
