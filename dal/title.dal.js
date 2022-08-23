const Titles = require("../models/Titles")
const {body} = require("express-validator");


const titleDataAccess = {
    async create(titleModel){
        return await titleModel.save()
    },
    async listAll(){
        return await Titles.find().select("_id name createdAt updatedAt")
    },
    async findById(id){
        return await Titles.findById({_id:id})
    },
    async updateById(id,body){
        return await Titles.findByIdAndUpdate({ _id: id }, body)
    },
    async deleteById(id){
        return await Titles.findByIdAndDelete({_id:id})
    },
    async findOneAndPopulate(where,populate){
        return await Titles.findOne(where).populate(populate)
    }



}


module.exports = titleDataAccess
