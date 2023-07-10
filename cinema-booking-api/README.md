# Cinema Booking

## About
This application built in 3 days.
This is simulate a cinema booking service, which means that users can reserve seat and can pay for it after reservation.

I am using lock mechanism to prevent seat reservation from 2 user at the same time for the same seat.

After a reservation was successful users must have to provide their email address to pay the reservation. If it this does not happen in two minutes reservaton will be cancelled automatically.

## Setup

1. To run this application first you have to install dependecies use `npm install` at the root directory.

2. After that you will need a mysql database. To connect the application to the datatbase just open the **.env** file and fill up the necessary fields related to database.

3. You have to dump my fake sql data from:  **./sql_data/sample.sql**


4. After that you have to provide a valid gmail address and an app-password related for that email account.To get an app-password for that email address I suggest you to follow this google instructions:
https://support.google.com/accounts/answer/185833?hl=en

5. Finally run the application with the `node app.js` command








