//initializing dotenv
require("dotenv").config()
require("../database/mongodb")
const DB = require("../models/summaryModel")

//delete data
async function deleteData(){
    await DB.deleteMany()
}


//insert data

async function insertData(){
    await DB.insertMany(
        [
            {
                name:"zester schmid",
                upcoming_stays:{
                    total_stays:1,
                    total_nights:2,
                    total_amount:4000
                },
                past_stays:{
                    total_stays:2,
                    total_nights:4,
                    total_amount:8000
                },
                cancelled_stays:0,
                total_stays:3
            },
        
            {
                name:"Jacob Zuma",
                upcoming_stays:{
                    total_stays:1,
                    total_nights:2,
                    total_amount:4000
                },
                past_stays:{
                    total_stays:2,
                    total_nights:4,
                    total_amount:8000
                },
                cancelled_stays:0,
                total_stays:3
            },
        ]
        
        
        )
} 
//deleteData()
insertData()
