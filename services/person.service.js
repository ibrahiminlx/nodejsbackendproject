const Person=require("../models/Persons")
const personDal = require("../dal/index")
// const personDto = require("../dto/title.dto")
const utils = require("../utils/index")
const fileService = require("./file.service")
const {error} = require("winston");
const personDto = require("../dto/person.dto")
const personCompanyDto=require("../dto/person.company.dto")
const personTitleDto=require("../dto/person.title.dto")
const titleDal = require("../dal/title.dal")
const companyDal = require("../dal/company.dal")



exports.createPerson=async (req)=>{
    try {
        const {name,surname,birthdate,gender,salary,tcNumber,email,password,country,city,company,title} = req.body
        const findedTitle = await titleDal.findById(title)
        const findedCompany = await companyDal.findById(company)
        const person = await new  Person({
            name,
            surname,
            birthdate,
            gender,
            salary,
            tcNumber,
            email,
            password:utils.helpers.hashToPassword(password),
            country,
            city,
            company,
            title,
            avatar:"",
            cvFile:""
        })
        const json = await personDal.person.create(person)
        findedTitle.persons.push(json.id)
        findedCompany.persons.push(json.id)
        await titleDal.create(findedTitle)
        await companyDal.create(findedCompany)

        return {...personDto,
            name:json.name,
            id:json.id,
            surname:json.surname,
            birthDate:new Date(json.birthDate),
            gender:json.gender,
            salary:new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
            tcNumber:json.tcNumber,
            email:json.email,
            country:json.country,
            city:json.city,
            avatar:json.avatar,
            cvFile:json.cvFile,
            title:json.title,
            company:json.company
        }
    }catch (e) {
        throw new Error(e)
    }
}
exports.uploadAvatar = async(req, res) => {
    try {
        const { id } = req.query
        console.log(id)
        const str = await fileService.uploadImage(req, res)
        const json = await personDal.person.updateById(id, { avatar: str })
        return {...personDto,
            name:json.name,
            id:json.id,
            surname:json.surname,
            birthDate:new Date(json.birthDate),
            gender:json.gender,
            salary:new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
            tcNumber:json.tcNumber,
            email:json.email,
            country:json.country,
            city:json.city,
            avatar:str,
            cvFile:json.cvFile,
            title:json.title,
            company:json.company,

        }
    } catch (error) {
        throw new Error(error)
    }
}
exports.uploadCv = async(req, res) => {
    try {
        const { id } = req.query
        const str = await fileService.uploadCv(req, res)
        const json = await personDal.person.updateById(id, { cvFile: str })
        return {...personDto,
            name:json.name,
            id:json.id,
            surname:json.surname,
            birthDate:new Date(json.birthDate),
            gender:json.gender,
            salary:new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
            tcNumber:json.tcNumber,
            email:json.email,
            country:json.country,
            city:json.city,
            avatar:json.avatar,
            cvFile:str,
            title:json.title,
            company:json.company,

        }
    } catch (error) {
        throw new Error(error)
    }
}
exports.getPersonById=async (req)=>{
    try {
        const {id}=req.params
        console.log(id)
        const json = await personDal.person.findById(id)
        delete personDto.title
        delete personDto.company
        return {...personDto,
            name:json.name,
            id:json.id,
            surname:json.surname,
            birthDate:new Date(json.birthDate),
            gender:json.gender,
            salary:new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
            tcNumber:json.tcNumber,
            email:json.email,
            country:json.country,
            city:json.city,
            avatar:json.avatar,
            cvFile:json.cvFile,
            createdAt:json.createdAt,
            updatedAt:json.updatedAt


        }
    }catch (e) {
        throw new Error(e)
    }
}
exports.findByEmail=async (email)=>{
    try {
        const json = await personDal.person.findOne({email})
        return json
    }catch (e) {
        throw new Error(e)
    }
}
exports.getCompany=async (req)=>{
    try {
        const {id}=req.params
        const json = await personDal.person.findOnePopulate({_id:id},{
            path:"company",
            select:"name _id year"
        })
        return {...personCompanyDto,name:json.company.name,id:json.company.id,year:json.company.year}
    }catch (e) {
        throw new Error(e)
    }
}
exports.getTitle=async (req)=>{
    try {
        const {id}=req.params
        const json = await personDal.person.findOnePopulate({_id:id},{
            path:"title",
            select:"_id name"
        })
        return {...personTitleDto,name:json.title.name,id:json.title.id}

    }catch (e) {
        throw new Error(e)
    }
}
exports.listPerson=async (req)=>{
    try {
        const json = await personDal.person.listAll({},[
            {
            path:"company",
            select:"_id year name"
            },
            {
                path:"title",
                select:"_id name"
            },
        ])
        return json
    }catch (e) {
        throw new Error(e)
    }
}
exports.listPersonsWithPagination=async (req)=>{
    try {
        const {perPage,page,sortBy,sortDirection} = req.query
        const json = await personDal.person.listAllWithPagination({},[
            {
                path:"company",
                select:"_id year name"
            },
            {
                path:"title",
                select:"_id name"
            },
        ],perPage,perPage*page,{[sortBy]:sortDirection})
        return json
    }catch (e) {
        throw new Error(e)
    }
}
exports.updatePerson=async (req)=>{
    try {
        const {name,surname,birthdate,gender,salary,tcNumber,email,password,country,city,company,title} = req.body
        const {id}=req.params
        const json = await personDal.person.updateById(id,{
            name,
            surname,
            birthdate,
            gender,
            salary,
            tcNumber,
            email,
            password:utils.helpers.hashToPassword(password),
            country,
            city,
            company,
            title,
            avatar:"",
            cvFile:""
        })
        return {...personDto,
            id:json.id,
            salary:new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
            name,
            surname,
            birthdate,
            gender,
            tcNumber,
            email,
            password,
            country,
            city,
            company,
            title,
            avatar:json.avatar,
            cvFile:json.cvFile
        }
    }catch (e) {
        throw new Error(e)
    }
}
exports.deletePersonById=async (req)=>{
    try {
        const {id}=req.query
        const findedPerson=await personDal.person.findById(id)
        const isAvatarDeleted =utils.helpers.deleteFromDisk(findedPerson.avatar ? findedPerson.avatar.split("uploads/")[1] :"")
        const isCvDeleted =utils.helpers.deleteFromDisk(findedPerson.cvFile ? findedPerson.cvFile.split("uploads/")[1] :"")
        if (isCvDeleted && isAvatarDeleted){
            const json = await personDal.person.deleteById(id)
            const findedTitle = await titleDal.findById(findedPerson.title)
            const findedCompany = await companyDal.findById(findedPerson.company)
            const newTitles=findedTitle.persons.filter((item)=>item.toString() !==findedPerson.id.toString())
            const newCompany=findedCompany.persons.filter((item)=>item.toString() !==findedPerson.id.toString())
            await titleDal.updateById(findedTitle._id,{persons:newTitles})
            await companyDal.updateById(findedCompany._id,{persons:newCompany})
            return {...personDto,
                name:json.name,
                id:json.id,
                surname:json.surname,
                birthDate:new Date(json.birthDate),
                gender:json.gender,
                salary:new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
                tcNumber:json.tcNumber,
                email:json.email,
                country:json.country,
                city:json.city,
                avatar:json.avatar,
                cvFile:json.cvFile,
                title:json.title,
                company:json.company,

            }
        }
        throw new Error("Dosya silme işlemi hatasi")


    }catch (e) {
        throw new Error(e)
    }
}
exports.updateCv=async (req,res)=>{
    try {
        const {id} = req.query
        const str = await fileService.uploadCv(req,res)
        const findedPerson=await personDal.person.findById(id)
        const isDeleted =utils.helpers.deleteFromDisk(findedPerson.cvFile ? findedPerson.cvFile.split("uploads/")[1] :"")
        if (isDeleted){
            const json = await personDal.person.updateById(id,{cvFile:str})
            return {...personDto,
                name:json.name,
                id:json.id,
                surname:json.surname,
                birthDate:new Date(json.birthDate),
                gender:json.gender,
                salary:new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
                tcNumber:json.tcNumber,
                email:json.email,
                country:json.country,
                city:json.city,
                avatar:json.avatar,
                cvFile:str,
                title:json.title,
                company:json.company,

            }
        }
        throw new Error("Dosya silme işlemi hatasi")

    }catch (e) {
        throw new Error(e)
    }
}
exports.updateAvatar=async (req,res)=>{
    try {
        const {id} = req.query
        const str = await fileService.uploadImage(req,res)
        const findedPerson=await personDal.person.findById(id)
        const isDeleted =utils.helpers.deleteFromDisk(findedPerson.avatar ? findedPerson.avatar.split("uploads/")[1] :"")
        if (isDeleted){
            const json = await personDal.person.updateById(id,{avatar:str})
            return {...personDto,
                name:json.name,
                id:json.id,
                surname:json.surname,
                birthDate:new Date(json.birthDate),
                gender:json.gender,
                salary:new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'YTL' }).format(json.salary),
                tcNumber:json.tcNumber,
                email:json.email,
                country:json.country,
                city:json.city,
                avatar:str,
                cvFile:json.cvFile,
                title:json.title,
                company:json.company,

            }
        }
        throw new Error("Dosya silme işlemi hatasi")

    }catch (e) {
        throw new Error(e)
    }
}
exports.signIn=async (req)=>{
    try {
        const {email,password} = req.body
        const _password=utils.helpers.hashToPassword(password)
        const json=await personDal.person.findOne({email,password:_password})
        if (json){
            const token=utils.helpers.createToken(json._id,json.name+" "+json.surname,json.email)
            return {
                fulname:json.name+" "+json.surname,
                id:json._id,
                email:json.email,
                token
            }
        }
        return null
    }catch (error) {
        throw new Error(error)
    }

}