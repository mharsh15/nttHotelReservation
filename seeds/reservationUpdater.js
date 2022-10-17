//initializing dotenv
require("dotenv").config()
require("../database/mongodb")
const DB = require("../models/reservationModel")


/** 
 * DO not use this module 
 * This is purely to update or delete a reservation without any restriction
 */

//de;\letes all reservation
async function deleteAll(){
    await DB.deleteMany()
}

async function findOneAndDelete(){
    const id = "634c249c0797933304268432"
    await DB.findByIdAndDelete(id)
}
//deleteAll()
//findOneAndDelete()