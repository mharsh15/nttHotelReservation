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
const { arrival_date } = require("../models/reservationTeplate")


/** adds reservation and does necessary updates to summary data basedatabase
* checks whether all parameters are present
* whehter respective field is number or string
* whether date is date
* once the confirmation is obtained from validaton function present in utils
* the date(YYYY-MM-DD) is converted to unix by function in utils
* booking code from models class is added
* template from models class(reservation template) is used to add data to reduce mistakes
*  data is persisted in reservation database
*  if data persistance is successful then data is persisted in summary database
*  total amount(tax+base) number of days(obtained by passing unix time), no of bookings is saved in ucoming stays part
* and total amount(previous + upcoming) is added 
* data is persisted to database
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

/// gets all reservations present in database - no validations
module.exports.getAllReservations = async(req,rep) =>{
    const allReservations = await DBReservation.find()
    rep.send(allReservations)

}

/** cancles an reservation
 * reservation id is obtained from params
 * it is queried in DB 
 * from that reservation guest_id is obtained which is querie in summary DB
 * if reservation is present with bookin status code as 1 aka reservation is not cancelled
 * reservation is cancelled
 * from summary, total amount(tax +amount) is substracted along with number of nights
 * stay ciunt is decremented by one
 * cancelled stays is incremented by one
 * data is persisted in datatbase 
 * if data is not found or guest_id is not found then fals is sent as response along with status code as 400
 * takes action on both reservation and summary databases to reflect accurate values

*/
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

/** get a particular reservation
 * id paramater is obtained from url
 * id is passed to database to query
 * if ID is found, reservation is retureed as it is 
 * if reservation is not found, catch block cateches itm sends status as 400 with string error

*/
module.exports.findOneReservation = async(req,rep)=>{
    try{
    
        const {id} = req.params
        const reservation = await DBReservation.findById(id)
        if(reservation){
           return rep.send(reservation)
        }
        
        rep.status(400).send("error")
    }
    catch(error){
        console.log(error)
        rep.status(400).send("error")
    }
}

/**
 * Route takes two paramaters as query from and to
 * from and to needs to be in YYYY-MM-DD asa 2022-11-01
 * checks difference between date
 * if everything is ok, an array will be sent, if no data is found array will be empty
 * if any error happens then status code sent will be 400 with word error
 */
module.exports.findReservationInDateRange = async(req,rep)=>{
    const {from, to} =req.query
    try{
        const fromDate = utils.convertDateToUnix(from)
        const toDate = utils.convertDateToUnix(to)
        const difference = utils.convertUnixTimeToDays(fromDate,toDate)
       
        if(difference > 0 ){
            const searchData = await DBReservation.find({arrival_date:{$lte:toDate,$gte:fromDate}})
            return rep.send(searchData)
        }

        rep.status(400).send("error")

    }

    catch(error){
        console.log(error)
        rep.status(400).send("error")
        
    }


}