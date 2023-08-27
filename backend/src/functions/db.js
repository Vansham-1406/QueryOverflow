const Mongoose = require("mongoose")
const {DB_URI} = require("../config/index")
const Connect_db = async() => {
    try 
    {
        await Mongoose.connect(DB_URI)
        console.log("Database connected")
    } 
    catch (error) 
    {
        console.log(error.message)
    } 
}

module.exports = Connect_db;