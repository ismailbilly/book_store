require('dotenv').config()
const express = require('express')
const app = express()
const uploadRoute = require('./routes/registration.route')

app.use(express.json());
const port = process.env.PORT || 3000

app.use(uploadRoute)

app.listen(port, ()=>{console.log('server is running')})