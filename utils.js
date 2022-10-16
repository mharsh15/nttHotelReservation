
//passes DB and id to function to check whether entry exists in database
module.exports.checkID = async(DB,id)=>{

    try{
          const data =  await DB.findById(id)
         return data? true:false
    }
    catch(error){
        console.log(error)
        return false
    }
}

/**
 * when an reservation is made, all necessary details are checked before saving form
*/
module.exports.checkReservationData = (req)=>{
    try{
        const {name} = req.body
        const {hotelName} = req.body
        const {arrival} = req.body
        const {departure}= req.body
        
        const base=parseFloat(req.body.base)
        const tax = parseFloat(req.body.tax)
        console.log(req.body)
        if(typeof name === "string" && typeof hotelName === "string" && !(name === "") && !(hotelName === "") && !(arrival ==="") && !(departure ==="") && base >= 0 && tax>=0){
            const checkInDate = this.convertDateToUnix(arrival)
            const checkOutDate = this.convertDateToUnix(departure)
            const todayDate = this.convertDateToUnix(new Date())
            
            //&& typeof arrival === "string" && typeof departure === "string" 
            const dateDiff = checkOutDate - checkInDate
            console.log(checkInDate)
            if( checkInDate >= todayDate && checkOutDate > todayDate && dateDiff>=86400 ){
                return true
            }
    
            return false
        }
        return false
    }
    catch(error){
        console.log(error)
        return false
    }

}

/* converts time in YYYY-MM-DD to unix time*/
module.exports.convertDateToUnix = (date) =>{
 return Math.floor(new Date(date).getTime() / 1000)

}
/* converts unix time to days takes arrival date first and departure date as second parameter*/
module.exports.convertUnixTimeToDays = (arrival,departure) =>{
 return Math.floor( (departure-arrival)/86400)

}