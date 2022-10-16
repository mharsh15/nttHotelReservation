/* 
Handles routes for summary router
It has GET request which fetches all summary present in data without pagination

*/

const router = require("express").Router()
const controller = require("../controller/summaryController")


//gets all summary
router.get("/", controller.getAllSummary)



module.exports = router