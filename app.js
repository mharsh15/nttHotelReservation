
const express = require("express")
const app = express()


//initializing dotenv
require("dotenv").config()

//initializing mongoose
require("./database/mongodb")
const DB = require("./models/summaryModel")

app.get("/summary",async(req,rep)=>{

    const allSummary = await DB.find()
    rep.send(allSummary)

})

app.listen(3000,()=>{
    console.log("running")

})
