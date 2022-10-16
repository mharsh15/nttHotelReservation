
const express = require("express")
const app = express()


//initializing dotenv
require("dotenv").config()

//initializing mongoose
require("./database/mongodb")

//without the below line earer forms cannot be parsed
app.use(express.urlencoded({ extended: true }))


////routes initialization
const controllerRoute = require("./routes/summaryRoute")


///routes
app.use("/summary",controllerRoute)


app.listen(3000,()=>{
    console.log("running")

})
