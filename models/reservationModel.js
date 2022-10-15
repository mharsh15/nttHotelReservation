/*
This File deals with basic schema of a reservation collection. 
Reservation collection will have  a unique reservation id which is a primary key
and id of user referenced from userSummary Table 
*/

const mongoose = require("mongoose")

//for importing table name
const tableName = require("./databaseName").reservation

const Schema = new mongoose.Schema({
guest_id:{
	type:mongoose.Schema.Types.ObjectId,
	ref:"Summary"
},
guest_name:{
	type:String,
	require:true
},
hotel_name:{
	type:String,
	require:true

},
arrival_date:{
	type:Number,
	require:true
},
departure_date:{
	type:Number,
	require:true
},
booking_status:{
type:Number,
require:true},

base_stay_amount:{
	type:Number,
	require:true
},
tax_amount:{
	type:Number,
	require:true
}

})

module.exports = mongoose.model(tableName,Schema)