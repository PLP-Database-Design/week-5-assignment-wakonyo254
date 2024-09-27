// importing dependancies
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');

//configure environment variables
dotenv.config();


// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


//test connection
db.connect((err) => {
    //connection succefull
    if(err) {
       return console.log("Error connecting to the datebase")
    }

    //if it was successfully connected
    console.log("Successfully connected to mysql:", db.threadId)
})

//1. retrive all patients
app.get('/patients', (req,res) => {
    const getPatients = "SELECT first_name, last_name, patient_id, date_of_birth FROM patients"
    db.query(getPatients, (err, data) => {
        //if an error occurs
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }
        //otherwise
        res.status(200).send(data)
    })
})


// 2. retrieve all providers
app.get('/providers', (req,res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to fetch data", err)
        }
        res.status(200).send(data)
    })
})

//3. filter patients by first name.
app.get('/patients-filter', (req,res) => {
    const getPatients = "SELECT first_name FROM patients"
    db.query(getPatients, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to fetch data!", err)
        }
        res.status(200).send(data)
    })
})


// 4. retrieve all providers with respective specialties
app.get('/providers-specialty', (req,res) => {
    const getProviders = "SELECT * first_name, provider_specialty"
    db.query(getProviders, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get data", err)
        }
        res.status(200).send(data)
    })
})



//listening to server
app.listen(3302, () => {
    console.log(`server is running on port 3302...`)
})

