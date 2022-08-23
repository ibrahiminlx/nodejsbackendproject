const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const titleValidator = require("../validations/index")


router.get("/all",controller.titleController.getAllTitles)
router.get("/getById/:id",[titleValidator.titleValidator.validateFindById()],controller.titleController.getTitlesById)
router.post("/create",[titleValidator.titleValidator.validateCreateTitle()],controller.titleController.createTitle)
router.put("/update/:id",[titleValidator.titleValidator.validateUpdateTitleById()],controller.titleController.updateTitle)
router.delete("/delete",[titleValidator.titleValidator.validateDeleteById()],controller.titleController.deleteTitleById)
router.get("/person/:id",[titleValidator.titleValidator.validateGetPersonsById()],controller.titleController.getPersonsById)



module.exports = {
    titles:router
}