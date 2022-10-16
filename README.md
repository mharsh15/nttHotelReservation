# Reservation API

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


### IDS for summary for testing
- Test Reservation: 634bda2e7554f49500745a11
- 634bda2e7554f49500745a10 - Magdanela
- 634bda2e7554f49500745a0f - Gloria
- 634bda2e7554f49500745a0e - Jessica
- 634bda2e7554f49500745a0d - Olaf
- 634bda2e7554f49500745a0c - Jacob
- 634bda2e7554f49500745a0b - Zester

## Routes and QC Cheching
- */reservation(GET) *
    - will send out all hotel reservation done. Pagenation is not implemented

- */reservation (POST)*
    - checks whether current user data is present in database
    - checks whether name of person, hotel, amount, tax, arriving and departure date field is not empty
    - checks whether amoumt and tax is > 0
    - checks whether booking and and departure date is greater than todays date
    - checks whether departure and arrival date is not same


    Example: Add below in Postman Form
    id: '634bda2e7554f49500745a11',
    name: 'Zester',
    hotelName: 'Marriot',
    arrival: '2022/11/11',
    departure: '2022-12-01',
    base: '2000',
    tax: 'abcd'  

    Result will be true with status code 200
    if any validation fails, it will send a status code of 400 wirh value false

 - */reservation/id (PUT)*
    - checks whether such a reservation exists and whether booking is not cancelled
    - if booking was found to be prior cancelled then no update is done
    - if not then in reservation its marked cancelled by changing digit to 0
    - and in summary, data is changed, like substracting total amount from upcoming stay info, along with substraction of days and booking number
    - and amount is substracted from total stays amount
    - cancelled stay info is increamented
    - status 200 with true is sent
    - if validation fails then false with status code 400 is sent
    
