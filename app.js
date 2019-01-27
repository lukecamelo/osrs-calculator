const express = require('express')
const app = express()
const axios = require('axios')
const port = 8080
const BASE_URL = 'http://services.runescape.com/m=itemdb_oldschool'

app.get('/test', (req, res) => {
  axios
    .get(`${BASE_URL}/api/catalogue/detail.json?item=2`)
    // .then(res => json(res))
    .then(data => {
      res.send(data.data)
    })
    .catch(err => console.log('error ', err))
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
