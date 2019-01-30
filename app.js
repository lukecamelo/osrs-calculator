const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const port = 8080
const BASE_URL = 'http://services.runescape.com/m=itemdb_oldschool'

const index = require('./server/routes/index')

app.use(cors())
app.use(bodyParser.json())
app.use('/items', index)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
