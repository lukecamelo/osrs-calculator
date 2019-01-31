const item_json = require('../../json/item_ids.json')
const item_materials = require('../../json/fletching/item_materials.json')
const axios = require('axios')
const BASE_URL = 'http://services.runescape.com/m=itemdb_oldschool'

module.exports = {
  returnItemsJson,
  addMaterialCosts
}

async function returnItemsJson(req, res, next) {
  let item_result, item_id
  const body = req.body
  console.log('this is body itemname ', body.itemName)
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

async function getItemInfo(itemName) {
  let item_result, item_id

  item_id = item_json.find(el => el.name === itemName).id
  try {
    item_result = await axios.get(
      `${BASE_URL}/api/catalogue/detail.json?item=${item_id}`
    )
  } catch (e) {
    console.log(e)
  }

  return item_result.data
}

async function addMaterialCosts(req, res, next) {
  const body = req.body
  let costTotal,
    matArray = []
  matArray = await item_materials
    .find(el => el.name === body.itemName)
    .materials.map(async mat => getItemInfo(mat))

  costTotal = await Promise.all(matArray).then(res => {
    return res.map(mat => mat.item.current.price).reduce((a, b) => a + b)
  })
  req.data = res.json(costTotal)
  next()
}
