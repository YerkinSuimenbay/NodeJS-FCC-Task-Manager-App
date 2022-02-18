const express = require('express')
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8000

// MIDDLEWARE
app.use(express.static('./public'))
app.use(express.json())

// ROUTES
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
    } catch (error) {
        console.log(error);
    }
}

start()