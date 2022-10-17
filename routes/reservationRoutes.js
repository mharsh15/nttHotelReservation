const router = require("express").Router()
const contorller = require("../controller/reservationController")


//adds a reservation
router
.get("/",contorller.getAllReservations)
.post("/", contorller.addReservation)
.get("/:id",contorller.findOneReservation)
.put("/:id",contorller.cancelReservation)


module.exports = router