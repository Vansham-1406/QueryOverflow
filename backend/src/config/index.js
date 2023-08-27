const {config} = require("dotenv")
const {parsed} = config();

const {PORT,DB_URI} = parsed

module.exports = {PORT,DB_URI}