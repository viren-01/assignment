const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require("dotenv");
dotenv.config();
const UserRoutes = require('./src/routes/UserRoute')

const server = () => {
    try {
        const app = express()
        const PORT = process.env.PORT
        const database = process.env.MONGODB_URI


        app.use(express.json())
        app.use(cors())

        //Routes
        app.use(UserRoutes)

        mongoose.connect(database, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
            if(err){
                console.log(err)
                console.log("Error in Creating database Connection....")
            }
            else{
                console.log("Database Connected Successfully")
            }
        })

        app.listen(PORT, (err) => {
            if (err) {
                console.log("Error in starting server....connection failed")
            }
            else {
                console.log("Server is listening at port", PORT)
            }
        })
    } catch (error) {
        console.log(error)
        console.log("Error in starting server....connection failed")
    }
}
server();

