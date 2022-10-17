//initializing dotenv
require("dotenv").config()
require("../database/mongodb")
const DB = require("../models/reservationModel")

async function addPastData(){

await DB.insertMany([
    {
            guest_id:"634ce8c537d47ff033a41f3c",
            guest_name: "Paingon Xi",
            hotel_name:"LeMeridian",
            arrival_date:1639699634,
            departure_date:1639958834,
            booking_status:1,
            base_stay_amount:40000,
            tax_amount:8000          
    },
    {
        guest_id:"634ce8c537d47ff033a41f3c",
        guest_name: "Tingshuan Tsu",
        hotel_name:"Leela",
        arrival_date:1650413234,
        departure_date:1650758834,
        booking_status:1,
        base_stay_amount:20000,
        tax_amount:4000          
    },
    {
        guest_id:"634ce8c537d47ff033a41f37",
        guest_name: "Camilla Rogers",
        hotel_name:"Taj",
        arrival_date:1658794034,
        departure_date:1658880434,
        booking_status:1,
        base_stay_amount:2000,
        tax_amount:360          
    },
    {
        guest_id:"634ce8c537d47ff033a41f38",
        guest_name: "Jacob Zuma",
        hotel_name:"Taj",
        arrival_date:1690416434,
        departure_date:1690589234,
        booking_status:1,
        base_stay_amount:3240,
        tax_amount:760          
    },

])
}

addPastData()