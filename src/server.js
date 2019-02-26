const express = require('express')
const bodyParser = require('body-parser')

const { PORT } = require('./constants/common')
const { Auth, FetchAllUsers } = require('./controllers/User')

const app = express()

// enable body parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/auth', Auth)
app.get('/users', FetchAllUsers)

app.listen(
    PORT, () => console.log('Hurray APIs are live....')
)

