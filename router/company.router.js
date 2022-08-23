const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const companyValidator = require("../validations/index")




router.get("/all",controller.companyController.getAllCompany)
router.get("/getById/:id",[companyValidator.companyValidator.companyValidator.validateFindById()],controller.companyController.getCompanyById)
router.post("/create",[companyValidator.companyValidator.companyValidator.validateCreateCompany()],controller.companyController.createCompany)
router.post("/uploadLogo",[companyValidator.companyValidator.companyValidator.validateUploadLogo()],controller.companyController.uploadLogo)
router.post("/updateLogo",[companyValidator.companyValidator.companyValidator.validateUpdateLogo()],controller.companyController.updateLogo)
router.put("/update/:id",[companyValidator.companyValidator.companyValidator.validateUpdateCompanyById()],controller.companyController.updateCompany)
router.delete("/delete",[companyValidator.companyValidator.companyValidator.validateDeleteById()],controller.companyController.deleteCompanyById)
router.get("/person/:id",[companyValidator.companyValidator.companyValidator.validateGetPersons()],controller.companyController.getPersonsById)

module.exports = {
    company:router
}