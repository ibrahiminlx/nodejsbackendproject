const Company = require("../models/Company")
const {body} = require("express-validator");
const Person = require("../models/Persons");
const companyDataAccess = {
    async create(companyModel){
        return await companyModel.save()
    },
    async updateById(id,body){
        return await Company.findByIdAndUpdate({ _id: id }, body)
    },
    async listAll(){
        return await Company.find().select("_id name logo year description createdAt updatedAt")
    },
    async deleteById(id){
        return await Company.findByIdAndDelete({_id:id})
    },
    async findById(id){
        return await Company.findById({_id:id})
    },
    async findOnePopulate(where,populate){
        return await Company.findOne(where).populate(populate)
    }

}
module.exports = companyDataAccess
