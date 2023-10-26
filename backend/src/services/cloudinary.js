const cloudinary = require("cloudinary")
const {CLOUD_NAME,API_KEY,API_SECRET} = require("../config/index")

cloudinary.config({
    cloud_name:  CLOUD_NAME,
    api_key: API_KEY,
    api_secret:  API_SECRET,
});

module.exports = cloudinary;