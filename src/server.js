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

        db.table('users').find({
            githubToken: req.body.user.githubToken
        }).then(
            records => {
                let userToSend = null

                if (records.length) {
                    userToSend = records[0]

                } else {
                    const newUser = {
                        ...req.body.user,
                        _id: uuidv1(),
                        joinedDate: new Date()
                    }
            
                    db.table('users').create(newUser)
            
                    userToSend = newUser
                }

                res.status(200).json(userToSend)
            }
        )
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

