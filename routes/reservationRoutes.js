const router = require("express").Router()
const contorller = require("../controller/reservationController")


//adds a reservation
router
.get("/",contorller.getAllReservations) //shows all reservations
.post("/", contorller.addReservation) // adds an reservation
.get("/search?",contorller.findReservationInDateRange) //searches an reservation with from and two date
.get("/:id",contorller.findOneReservation) // shows a particular reservation 
.put("/:id",contorller.cancelReservation) //cancles an reservation




module.exports = router