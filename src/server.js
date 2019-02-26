const express = require('express')
const bodyParser = require('body-parser')
const uuidv1 = require('uuid/v1');

const app = express()

const { PORT } = require('./constants/common')
const db = require('./db')

// enable body parsing
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post(
    '/auth', (req, res) => {
        const newUser = {
            ...req.body,
            _id: uuidv1(),
            joinedDate: new Date()
        }

        db.table('users').create(newUser)

        res.status(200).json(newUser)
    }
)

app.get(
    '/users', (req, res) => {
        db.table('users').get().then(
            records =>
                res.status(200).json(records)
        )
    }
)

app.listen(
    PORT, () => console.log('Hurray APIs are live....')
)

