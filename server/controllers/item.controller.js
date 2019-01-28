const item_json = require('../../json/item_ids.json')
const axios = require('axios')
const BASE_URL = 'http://services.runescape.com/m=itemdb_oldschool'

module.exports = {
  returnItemsJson
}

async function returnItemsJson(req, res, next) {
  let item_result, item_id
  const body = req.body

  for (let i = 0; i < item_json.length; i++) {
    if (item_json[i].name == body.itemName) {
      item_id = item_json[i].id
    }
  }

  try {
    item_result = await axios.get(
      `${BASE_URL}/api/catalogue/detail.json?item=${item_id}`
    )
  } catch (e) {
    console.log(e)
  }

  console.log('item result: ', item_result)
  req.data = res.json(item_result.data)
  next()
}
