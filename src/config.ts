require('custom-env').env()

module.exports = {
    MONGO_URI: process.env.MONGO_URI,  
    API_BASE_URL: process.env.API_BASE_URL,
    LOGIN_EMAIL: process.env.LOGIN_EMAIL, 
    LOGIN_PASSWORD: process.env.LOGIN_PASSWORD
}