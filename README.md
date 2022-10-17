# Reservation API
to run the concerned API, write node app.js in console
## Routes
- /summary 
    (GET)
    : Displays summary for all users like total cancelled bookings, total bookings
- /reservation 
    (GET)
    : Shows all upcoming reservations
- /reservation/id
    (GET)
    :shows reservations when a particular id is passed
- /reservation/:id
    (GET)
    :shows reservation for particular ID
- /reservation
    (POST)
    :adds an reservation to a particular guest and updates summary database
- /reservation/:id
    (POST)
    :updates reservation status to false and updates summary database

- /reservation/search?from="yyyy-dd-mm"&to="yyyy-mm-dd"              
    (GET)
    :finds all reservation in given date range, whether reservation is cancelled or completed or booked for future

### IDS for summary for testing
- NTT Reservation: 634bda2e7554f49500745a11
- Harsh Test: 634ce8c537d47ff033a41f3d
- 634ce8c537d47ff033a41f3c - Magdanela
- 634ce8c537d47ff033a41f3b - Gloria
- 634ce8c537d47ff033a41f3a - Jessica
- 634ce8c537d47ff033a41f39 - Olaf
- 634ce8c537d47ff033a41f38 - Jacob
- 634ce8c537d47ff033a41f37 - Zester

## Routes and QC Cheching
- */reservation(GET) *
    - will send out all hotel reservation done. Pagenation is not implemented

- */reservation (POST)*
    - checks whether current user data is present in database
    - checks whether name of person, hotel, amount, tax, arriving and departure date field is not empty
    - checks whether amoumt and tax is > 0
    - checks whether booking and and departure date is greater than todays date
    - checks whether departure and arrival date is not same
    - A day can have multiple reservations


    Example: Add below in Postman Form for creating an reservation.
    id: '634bda2e7554f49500745a11',
    name: 'Zester',
    hotelName: 'Marriot',
    arrival: '2022-11-11',
    departure: '2022-12-01',
    base: '2000',
    tax: 'abcd'  



    Result will be true with status code 200
    if any validation fails, it will send a status code of 400 with value false

 - */reservation/id (PUT)*
    - checks whether such a reservation exists and whether booking is not cancelled
    - if booking was found to be prior cancelled then no update is done
    - if not then in reservation its marked cancelled by changing digit to 0
    - and in summary, data is changed, like substracting total amount from upcoming stay info, along with substraction of days and      booking number
    - and amount is substracted from total stays amount
    - cancelled stay info is increamented
    - status 200 with true is sent
    - if validation fails then false with status code 400 is sent

- */reservation/id (GET)*
    - finds an reservation and if it is present in database reservation will be sent
    - if reservation is not available then status code will be sent as 400 and will send string as "Error"

- */reservation (GET)*
    - fetches all reservation present in database without any pagination.
    - this route is not doing any validation

- */reservation?from=<yyyy-mm-dd>&to=<yyyy-mm-dd>
    - fetches all reservation present in database between from and two date
    - checks whether from date is less than two date
    - checks whether concerned query parameter is a date or not
    - if yes then it queries database in that particular date range for start date of reservation
    - it displays all reservations, cancelled as well as booked reservation in concerned date range
    - if no then it sends an status as 404 and 





## Application Testing
 - database has eight entries for summary database
  Summary ID for Testing : 634bda2e7554f49500745a11
  ### localhost:3000/summary 
    (GET)
    - when no change is done, it should display 8 results
    -  the name for your test is NTT Test.
    - all values should be zero like a fresh user

  ### localhost:3000/reservation 
    (POST)
    - when executing this route, add data in  Body>Url-form-encoded>Bulk Edit 
    id: 634bda2e7554f49500745a11,
    name:Zester
    hotelName:Marriot
    arrival:2022-11-11
    departure:2022-11-16
    base:2000
    tax:360

    - it will send status as true and status code 200( for above code ) and id of booking. Save this ID of Booking so that this can be used to cancel amount
    Sample success response
    {
    "status": true,
    "id": "634cfd03f4cc89e4600f2c85"
    }
    - if any parameter is missing, response will be false with status code 400 and ID as null
    {
    "status": false,
    "id": null
    }

### localhost:3000/reservation 
    (GET)
    - once above data is executed you will get all reservations with new reservations in display

### localhost:3000/reservation/id
    (GET)
    - fetches a particular reservation by passing reservation ID obtained from previous step
    - will give below output or similar metadata with booking_status as 1 which means booking is not canceled

        {"_id":<your_id>,"guest_id":"634ce8c537d47ff033a41f3d","guest_name":"Zester","hotel_name":"Marriot","arrival_date":1668124800,"departure_date":1668556800,"booking_status":1,"base_stay_amount":2000,"tax_amount":360,"__v":0}

    - if there is no reservation ID then response will be Error with status 400

### localhost:3000/reservation/id
    (PUT)
    - this route cancles an reservation provided reservation is not cancelled. if reservation is cancelled prior, no change is done to database, but sends response as true and if id is not availabe then response is sent as false
    if cancelled prior or send for cancelling booking 
    - response -> true status code 200
    else -> false status code 400

### localhost:3000/reservation/search?from=<YYYY-MM-DD>&&to=<YYYY-MM-DD>
    (GET)
    - if Reservation within date range after calidation is found then it will send result as ab array
    - else status code of 400 is sent with value "error" string
    - if resut is available it will be sent as an array like one below
    
    [
        {
            "_id": "634cecc1c9188011291605a0",
            "guest_id": "634ce8c537d47ff033a41f3d",
            "guest_name": "Zester",
            "hotel_name": "Marriot",
            "arrival_date": 1668124800,
            "departure_date": 1668556800,
            "booking_status": 0,
            "base_stay_amount": 2000,
            "tax_amount": 360,
            "__v": 0
        },
        {
            "_id": "634cf2c094b12ac3cfed9acc",
            "guest_id": "634ce8c537d47ff033a41f3d",
            "guest_name": "Zester",
            "hotel_name": "Marriot",
            "arrival_date": 1668124800,
            "departure_date": 1668556800,
            "booking_status": 0,
            "base_stay_amount": 2000,
            "tax_amount": 360,
            "__v": 0
        }
 
    ]

    - if not then status of 400 with word error will be sent back
