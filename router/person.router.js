const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const personValidator = require("../validations/person.validator")


router.get("/all",controller.personController.getAllPersons)
router.get("/listPagination",[personValidator.personValidator.validateListPagination()],controller.personController.getAllPersonsPagination)
router.get("/getById/:id",[personValidator.personValidator.validateGetPersonById()],controller.personController.getPersonById)
router.post("/create",[personValidator.personValidator.validateCreatePerson()],controller.personController.createPerson)
router.put("/update/:id",[personValidator.personValidator.validateUpdatePerson()],controller.personController.updatePerson)
router.delete("/delete",[personValidator.personValidator.validateDeleteById()],controller.personController.deletePersonById)
router.post("/uploadAvatar",[personValidator.personValidator.validateAvatar()],controller.personController.uploadAvatar)
router.post("/updateAvatar",[personValidator.personValidator.validateUpdateAvatar()],controller.personController.updateAvatar)
router.post("/uploadCv",[personValidator.personValidator.validateCv()],controller.personController.uploadCv)
router.post("/updateCv",[personValidator.personValidator.validateUpdateCv()],controller.personController.updateCv)
router.get("/getCompany/:id",[personValidator.personValidator.validateGetCompany()],controller.personController.getCompany)
router.get("/getTitle/:id",[personValidator.personValidator.validateGetTitle()],controller.personController.getTitle)
router.post("/signIn",[personValidator.personValidator.validateSignIn()],controller.personController.signIn)


module.exports = {
    person:router
}