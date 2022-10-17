/* 
This Mongoose schema stores user is and associated booking of user
if booking is done then bumber 1 is used
if booking is canceled its updated to zero

*/

const mongoose = require("mongoose")
const tableName = require("./databaseName").summary
const Schema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    upcoming_stays:{
            total_stays:{type:Number
                ,require:true},
            total_nights:{
                type:Number,
                require:true},
            total_amount:{
                type:Number,
                require:true
            },
        },

    past_stays:{
            total_stays:{type:Number
                ,require:true
            },
            total_nights:{
                type:Number,
                require:true
            },
            total_amount:{
                type:Number,
                require:true
                }
            },
    cancelled_stays:{
        require:true,
        type:Number
    },
    total_stays:{
        require:true,
        type:Number
    }

})

module.exports = mongoose.model(tableName,Schema)