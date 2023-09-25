const config = require('./config/config');
const app = require('./src/app');
const http = require('http');
const server = http.createServer(app)

server.listen(config.port, () => console.log(`Server was Runing on ${config.serverUrl}:${config.port}`))
require('./config/database')