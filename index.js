//////// Require ////////

const express = require("express")
// const helmet = require("helmet")
// const cors = require("cors")
const logger =  require("./middleware/logger");



//////// Routers ////////

const welcomeRouter = require("./welcome/welcome-router")
const projectsRouter = require("./projects/projectsRouter")
const actionsRouter = require("./actions/actions")


//////// Server / Port ////////

const server = express()
const port = process.env.PORT || 3456


//////// Servers / Middlewares ////////

server.use(express.json())
// server.use(helmet())
// server.use(cors())
server.use(logger({ format: "medium" }));


server.use("/", welcomeRouter)
server.use("/projects", projectsRouter)
server.use("/projects/:id/actions", actionsRouter)

server.use((req, res) => {
    res
        .status(404)
        .json({
            message: "Route was not found."
        })
});

server.use((err, req, res, next) => {
    console.log(err);
    res
        .status(500)
        .json({
            message: "Oops! Something went wrong!"
        })
});

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
