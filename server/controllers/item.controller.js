const item_json = require('../../json/item_ids.json')
const axios = require('axios')
const BASE_URL = 'http://services.runescape.com/m=itemdb_oldschool'

module.exports = {
  returnItemsJson
}

async function returnItemsJson(req, res, next) {
  let item_result, item_id
  const body = req.body

  item_id = item_json.find(el => el.name === body.itemName).id

  try {
    item_result = await axios.get(
      `${BASE_URL}/api/catalogue/detail.json?item=${item_id}`
    )
  } catch (e) {
    console.log(e)
  }

  req.data = res.json(item_result.data)
  next()
}
