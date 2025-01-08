require("dotenv").config();

const config = {
    cloudName : process.env.CLOUD_NAME,
    apiKey : process.env.API_KEY,
    apiSecrete : process.env.API_SECRETE,
    myDb : process.env.MY_DB,
    port : process.env.PORT,
}

module.exports = config;