
const express = require("express")
const app = express()


//initializing dotenv
require("dotenv").config()

//initializing mongoose
require("./database/mongodb")

//without the below line earer forms cannot be parsed
app.use(express.urlencoded({ extended: true }))


////routes initialization
const summaryRoute = require("./routes/summaryRoute")
const reservationRoute = require("./routes/reservationRoutes")

///routes
app.get("/", (req,rep)=>{ rep.send("This is Test")})
app.use("/summary",summaryRoute)
app.use("/reservation", reservationRoute)


app.get("*", (req,rep)=>{
    rep.status(404).send("Oops No Such Route Exists")

})

app.listen(3000,()=>{
    console.log("running")

})
