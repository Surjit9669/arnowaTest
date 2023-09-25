const mongoose = require('mongoose')
const config = require('./config')

const dbUri = config.dbUri
const dbName = `arnowaTest`



mongoose
    .connect(`${dbUri}/${dbName} `, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(`MongoDB is connect with ${dbUri}/${dbName} `))
    .catch((error) => console.log(error));



