require('dotenv').config();

const config = {
    dbUri: process.env.DB_URI,
    port: process.env.PORT || 3000,
    secretKey: process.env.SECRET_KEY || "123456789",
    serverUrl: process.env.SERVER_URL,
}

module.exports = config