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
                total_stays:12000
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
                total_stays:12000
            },
            {
                name:"Olaf Schultz",
                upcoming_stays:{
                    total_stays:0,
                    total_nights:0,
                    total_amount:0
                },
                past_stays:{
                    total_stays:10,
                    total_nights:22,
                    total_amount:86000
                },
                cancelled_stays:5,
                total_stays:86000
            },
        
            {
                name:"Jessica Arden",
                upcoming_stays:{
                    total_stays:5,
                    total_nights:20,
                    total_amount:89000
                },
                past_stays:{
                    total_stays:0,
                    total_nights:0,
                    total_amount:0
                },
                cancelled_stays:0,
                total_stays:89000
            },
            {
                name:"Gioria Meloni",
                upcoming_stays:{
                    total_stays:1,
                    total_nights:2,
                    total_amount:1800
                },
                past_stays:{
                    total_stays:0,
                    total_nights:0,
                    total_amount:0
                },
                cancelled_stays:1,
                total_stays:1800
            },
        
            {
                name:"Magdalena Andersson",
                upcoming_stays:{
                    total_stays:1,
                    total_nights:10,
                    total_amount:400000
                },
                past_stays:{
                    total_stays:3,
                    total_nights:12,
                    total_amount:12000000
                },
                cancelled_stays:5,
                total_stays:1240000
            },
            {
                name:"Harsh TEST",
                upcoming_stays:{
                    total_stays:0,
                    total_nights:0,
                    total_amount:0
                },
                past_stays:{
                    total_stays:0,
                    total_nights:0,
                    total_amount:0
                },
                cancelled_stays:0,
                total_stays:0
            },
            {
                name:"NTT TEST",
                upcoming_stays:{
                    total_stays:0,
                    total_nights:0,
                    total_amount:0
                },
                past_stays:{
                    total_stays:0,
                    total_nights:0,
                    total_amount:0
                },
                cancelled_stays:0,
                total_stays:0
            },
        ]
        
        
        )
} 
//deleteData()
insertData()
