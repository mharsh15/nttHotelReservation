/* controller for summary  route*/
const DB = require("../models/summaryModel")

module.exports.getAllSummary = async(req,rep)=>{

    const allSummary = await DB.find()
    rep.send(allSummary)
}