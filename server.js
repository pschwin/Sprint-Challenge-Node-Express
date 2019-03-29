const express = require ('express');
const server = express()
const actionRouter = require('./data/routers/action-routers');
const projectRouter = require('./data/routers/project-routers');

server.use(express.json());
server.use('/actions', actionRouter);
server.use('/projects', projectRouter);

server.get('/', (req,res, next) => {
    res.send(`<h2>Server is Working</h2>`)
})

module.exports = server;