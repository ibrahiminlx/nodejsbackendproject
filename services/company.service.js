const Company=require("../models/Company")
const companyDal = require("../dal/index")
const companyDto = require("../dto/company.dto")
const utils = require("../utils/index")
const fileService = require("./file.service")
const {error} = require("winston");
const personDal = require("../dal/person.dal")
const titleDal = require("../dal/title.dal")

exports.createCompany=async (req)=>{
    try {
        const {name,year,description} = req.body
        const company = await new  Company({
            name,
            year,
            description,
            logo:""
        })
        const json = await companyDal.company.create(company)
        return {...companyDto,name:json.name,year:json.year,logo:json.logo,description:json.description,id:json._id,createdAt:json.createdAt,updatedAt:json.updatedAt}
    }catch (e) {
        throw new Error(e)
    }
}
exports.uploadLogo = async(req, res) => {
    try {
        const { id } = req.query
        const str = await fileService.uploadImage(req, res)
        const json = await companyDal.company.updateById(id, { logo: str })
        return {...companyDto, name: json.name, year: json.year, logo: str, description: json.description, id: json._id, createdAt: json.createdAt, updatedAt: json.updatedAt }
    } catch (error) {
        throw new Error(error)
    }
}
exports.updateLogo=async (req,res)=>{
    try {
        const {id} = req.query
        const str = await fileService.uploadImage(req,res)
        const findedCompany=await companyDal.company.findById(id)
        const isDeleted =utils.helpers.deleteFromDisk(findedCompany.logo ? findedCompany.logo.split("uploads/")[1] :"")
        if (isDeleted){
            const json = await companyDal.company.updateById(id,{logo:str})
            return {...companyDto,name:json.name,year:json.year,logo:json.logo,description:json.description,id:json._id,createdAt:json.createdAt,updatedAt:json.updatedAt}
        }
        throw new Error("Dosya silme işlemi hatasi")

    }catch (e) {
        throw new Error(e)
    }
}
exports.listCompany=async ()=>{
    try {
        const json = await companyDal.company.listAll()
        return json
    }catch (e) {
        throw new Error(e)
    }
}
exports.deleteCompanyById=async (req)=>{
    try {
        const {id}=req.query
        const findedCompany=await companyDal.company.findById(id)
        const isDeleted =utils.helpers.deleteFromDisk(findedCompany.logo ? findedCompany.logo.split("uploads/")[1] :"")
        if (isDeleted){
            const persons =await personDal.listAll({company:id})
            persons.forEach(async (person)=>{
                utils.helpers.deleteFromDisk(person.avatar ? person[index].avatar.split("uploads/")[1] :"")
                utils.helpers.deleteFromDisk(person.cvFile ? person[index].cvFile.split("uploads/")[1] :"")
                const findedTitle = await titleDal.findById(person.title)
                const newPersonForTitle = findedTitle.persons.filter((item)=> item.toString()!==findedPerson._id.toString())
                await titleDal.updateById(findedTitle._id,{persons:newPersonForTitle})
            })

            await personDal.deleteMultiple({company:id})
            const json = await companyDal.company.deleteById(id)
            return {...companyDto,name:json.name,year:json.year,logo:json.logo,description:json.description,id:json._id,createdAt:json.createdAt,updatedAt:json.updatedAt}
        }
        throw new Error("Dosya silme işlemi hatasi")


    }catch (e) {
        throw new Error(e)
    }
}
exports.findCompanyById=async (req)=>{
    try {
        const {id}=req.params
        console.log(id)
        const json = await companyDal.company.findById(id)
        return {...companyDto,name:json.name,year:json.year,logo:json.logo,description:json.description,id:json._id,createdAt:json.createdAt,updatedAt:json.updatedAt}
    }catch (e) {
        throw new Error(e)
    }
}
exports.updateCompany=async (req)=>{
    try {
        const {name,year,description} = req.body
        const {id}=req.params
        const json = await companyDal.company.updateByID(id,{name,year,description})
        return {...companyDto,name,year,logo:json.logo,description,id:json._id,createdAt:json.createdAt,updatedAt:json.updatedAt}
    }catch (e) {
        throw new Error(e)
    }
}
exports.getPersonsById=async (req)=>{
    try {
        const { id } = req.params
        const json = await companyDal.company.findOnePopulate({ _id: id }, {
            path: 'persons',
            select: 'name _id surname tcNumber'
        })
        return json.persons
    } catch (error) {
        throw new Error(error)
    }
}