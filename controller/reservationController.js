/**
 * Cotroller functions takes care of 
 * 
 */

// Utils function for modularization 
const utils = require("../utils")
const form = require("../models/reservationTeplate")

//for reservation constant
const reservationStatusCode = require("../models/constantsData").reservationDatabaseBookingStatusCode
// Handles reservation route
const DBSummary = require("../models/summaryModel")
const DBReservation = require("../models/reservationModel")


/**adds reservation and does necessary updates to summary data basedatabase
*
*/
module.exports.addReservation = async(req,rep)=>{

       const  {id} = req.body
       const {name} = req.body
       const {hotelName} = req.body
       let {arrival} = req.body
       let {departure}= req.body
       const status = reservationStatusCode.booked
       const {base}=req.body
       const {tax} = req.body
       
       const idCheck= await utils.checkID(DBSummary,id) 
       const dataCheck = utils.checkReservationData(req)
       console.log(idCheck,dataCheck)
       if(idCheck && dataCheck){
            //converting date to unix time
            arrival =utils.convertDateToUnix(arrival)
            departure =utils.convertDateToUnix(departure)
            //converting data to num
            const baseNum = parseFloat(base)
            const taxNum = parseFloat(tax)
            //adding data to form template

            form.arrival_date = arrival
            form.base_stay_amount = baseNum
            form.booking_status =status
            form.departure_date = departure
            form.guest_id =id
            form.guest_name = name
            form.hotel_name= hotelName
            form.tax_amount = taxNum
            const data = new DBReservation(form)
            const saved = await data.save()
            if(saved){
                const summary = await DBSummary.findById(id)
                const totalAmount = taxNum+baseNum
                summary.upcoming_stays.total_amount = summary.upcoming_stays.total_amount +totalAmount
                summary.upcoming_stays.total_stays += 1
                summary.upcoming_stays.total_nights += utils.convertUnixTimeToDays(arrival,departure)
                summary.total_stays += totalAmount
                await summary.save()
            }

            return rep.send({
                status:true,
                id:saved.id
            })
       }

       rep.status(400).send({status:false,id:null})
}

/// get all reservations
module.exports.getAllReservations = async(req,rep) =>{
    const allReservations = await DBReservation.find()
    rep.send(allReservations)

}

//cancle an reservation
//takes action on both reservation and summary databases to reflect accurate values
module.exports.cancelReservation = async(req,rep) =>{
    try{
        //checks reservations

        const {id} = req.params
        console.log(id)
        const reservation = await DBReservation.findById(id)
        const summary = await DBSummary.findById(reservation.guest_id)
        //if reservation is booked only then action is taken otherwise status code is sent its cancelled
        if(reservation.booking_status === reservationStatusCode.booked){
            reservation.booking_status = reservationStatusCode.cancelled
            const cost = reservation.tax_amount +reservation.base_stay_amount
            const days = utils.convertUnixTimeToDays(reservation.arrival_date,reservation.departure_date)
            summary.upcoming_stays.total_amount -= cost
            summary.upcoming_stays.total_nights -= days
            summary.upcoming_stays.total_stays -= 1
            summary.cancelled_stays +=1
            summary.total_stays-= cost  
            await reservation.save()
            await summary.save()
        }

        rep.send(true)

    }
    catch(error)
    {
        console.log(error)
        rep.status(400).send(false)
    }

}

//get a particular reservation
module.exports.findOneReservation = async(req,rep)=>{
    try{
    
        const {id} = req.params
        const reservation = await DBReservation.findById(id)
        if(reservation){
           return rep.send(reservation)
        }
        
        rep.status(400).send("Error")
    }
    catch(error){
        console.log(error)
        rep.status(400).send("error")
    }
}