const uuidv1 = require('uuid/v1')
const db = require('../db')

const Auth = (req, res) => {
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

const FetchAllUsers =  (req, res) => {
    db.table('users').get().then(
        users =>
            res.status(200).json({
                users
            })
    )
}

module.exports = {
    Auth,
    FetchAllUsers
}
