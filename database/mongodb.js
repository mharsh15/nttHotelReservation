// for connecting to mongo db atlas
const mongoose = require("mongoose")

const mongoDbURL = process.env.MONGOATLAS
module.export=mongoose.connect(mongoDbURL,
{})
.then(() => {
    console.log("Connected to MongoDB")
})
.catch(error => {
    console.log("Error connecting to mongoDB")
    console.log(error);

})