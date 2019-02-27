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

app.post('/payload', (request, response) => {

    const payload = request.body

    if (payload.event_type == 'merge_request') {
        const { user, object_attributes } = payload
        
        if ( object_attributes.state === 'merged' ) {
            const { source_branch } = object_attributes
            const splittedBranchName = source_branch.split('-')
            const rewardsPoints = splittedBranchName[1]
        }
    }
})

app.listen(
    PORT, () => console.log('Hurray APIs are live....')
)

