const Title=require("../models/Titles")
const titleDal = require("../dal/index")
const titleDto = require("../dto/title.dto")
const utils = require("../utils/index")
const fileService = require("./file.service")
const {error} = require("winston");
const personDal = require("../dal/person.dal")
const companyDal = require("../dal/company.dal");






exports.createTitle=async (req)=>{
    try {
        const {name} = req.body
        const title = await new  Title({
            name,
            persons:[]
        })
        const json = await titleDal.title.create(title)
        return {...titleDto,name:json.name,id:json._id,createdAt:json.createdAt,updatedAt:json.updatedAt}
    }catch (e) {
        throw new Error(e)
    }
}
exports.listTitles=async ()=>{
    try {
        const json = await titleDal.title.listAll()
        return json
    }catch (e) {
        throw new Error(e)
    }
}
exports.findTitleById=async (req)=>{
    try {
        const { id } = req.params
        const json = await titleDal.title.findById(id)
        return {...titleDto, name: json.name, id: json._id, createdAt: json.createdAt, updatedAt: json.updatedAt }
    } catch (error) {
        throw new Error(error)
    }

}
exports.updateTitles=async (req)=>{
    try {
        const {name} = req.body
        const {id}=req.params
        const json = await titleDal.title.updateById(id,{name})
        return {...titleDto,name,id:json._id,createdAt:json.createdAt,updatedAt:json.updatedAt}
    }catch (e) {
        throw new Error(e)
    }
}
exports.deleteTitleById=async (req)=>{
    try {
        const {id}=req.query
        const json = await titleDal.title.deleteById(id)
        const persons = await personDal.listAll({title:id})
        persons.forEach(async (person)=>{
            utils.helpers.deleteFromDisk(person.avatar ? person[index].avatar.split("uploads/")[1] :"")
            utils.helpers.deleteFromDisk(person.cvFile ? person[index].cvFile.split("uploads/")[1] :"")
            const findedCompany = await companyDal.findById(person.company)
            const newPersonForCompany = findedCompany.persons.filter((item)=> item.toString()!==person._id.toString())
            await companyDal.updateById(findedCompany._id,{persons:newPersonForCompany})
        })
        await personDal.deleteMultiple({title:id})
        return {...titleDto,name:json.name,id:json._id,createdAt:json.createdAt,updatedAt:json.updatedAt}

    }catch (e) {
        throw new Error(e)
    }
}
exports.findPersonById=async (req)=>{
    try {
        const { id } = req.params
        const json = await titleDal.title.findOneAndPopulate({ _id: id }, {
            path: 'persons',
            select: 'name _id surname tcNumber'
        })
        return json.persons
    } catch (error) {
        throw new Error(error)
    }
}