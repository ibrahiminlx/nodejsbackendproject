
exports.getAllContries=(req,res)=>{
    try {
        const countries = require("../jsons/countries.json");
        return countries
    }catch (e) {
        throw new Error(e)
    }
}
exports.getCityByCountryId=(id)=>{
    try {
        const citiesArray = require("../jsons/cities.json")
        const cities = citiesArray.filter((item)=>item.country_id===id)
        return cities
    }catch (e) {
        console.log(e)
    }
}