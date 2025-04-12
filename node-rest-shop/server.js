// we create server in javascript wheen using Node JS

const http = require('http');
const app = require('./app');// import app

const port = process.env.PORT || 3000

const server = http.createServer(app);//passing appp to create Server


server.listen(port);