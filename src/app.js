const app = require('./config/express');
const http = require('http');
// Create a local server to receive data from
const server = http.createServer(app);

server.listen(3001);