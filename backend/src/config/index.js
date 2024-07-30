const {config} = require("dotenv")
const {parsed} = config();

const {PORT,DB_URI,JWT_TOKEN,OPEN_API,CLOUD_NAME,API_KEY,API_SECRET,pass} = parsed

module.exports = {PORT,DB_URI,JWT_TOKEN,OPEN_API,CLOUD_NAME,API_KEY,API_SECRET,pass}