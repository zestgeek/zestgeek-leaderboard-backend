const protoDB = require('proto-db')
const path = require('path')

const db = new protoDB(path.join(__dirname, '../db'))

db.createStore('zestgeek-leaderboard')
db.setStore('zestgeek-leaderboard')
db.createTable('users')

module.exports = db