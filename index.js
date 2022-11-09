require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const bookRoute = require('./routes/book.route')

app.use(bodyParser.json())
app.use(bookRoute)

app.listen(port, ()=>{'server is running'})