const item_json = require('../../json/item_ids.json')
const fletching_materials = require('../../json/fletching/fletching_materials.json')
const axios = require('axios')
const BASE_URL = 'http://services.runescape.com/m=itemdb_oldschool'

module.exports = {
  returnItemsJson,
  addMaterialCosts,
  allMarginRoute
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

async function addMaterialCosts(req, res, next) {
  const body = req.body
  let costTotal,
    matArray = [],
    item,
    itemPrice

  // Break this part down into separate methods, or at least introduce helpers
  matArray = await getMaterials(body.itemName, fletching_materials)

  costTotal = await Promise.all(matArray).then(res => {
    return res.map(mat => getMatPrice(mat)).reduce((a, b) => a + b)
  })

  itemPrice = await fetchItemData(String(body.itemName))
  itemPrice = await itemPrice.item.current.price
  item = await fetchItemData(String(body.itemName))

  if (typeof itemPrice !== 'number') {
    itemPrice = parseFloat(itemPrice.replace(/,/, ''))
  }

  req.data = res.json({
    materialCost: costTotal,
    itemPrice: itemPrice,
    profit: itemPrice - costTotal,
    item
  })
  next()
}

async function fetchItemData(itemName) {
  let item_result, item_id

  item_id = item_json.find(
    el => el.name.toLowerCase() === itemName.toLowerCase()
  ).id
  try {
    item_result = await axios.get(
      `${BASE_URL}/api/catalogue/detail.json?item=${item_id}`
    )
  } catch (e) {
    console.log(e)
  }

  return item_result.data
}

function getAllMargins(mat_json) {
  let array = []
  array = mat_json.map(item => {
    return item.name
  })
  return array
}

async function allMarginRoute(req, res, next) {
  let marginArray = await getAllMargins(fletching_materials)
  marginArray = await marginArray.map(item => fetchItemData(item))
  req.data = res.json({ marginArray })
  next()
}

function getMaterials(item, mat_json) {
  return mat_json
    .find(el => el.name.toLowerCase() === item.toLowerCase())
    .materials.map(async mat => fetchItemData(mat))
}

function getMatPrice(mat) {
  return typeof mat.item.current.price != 'number'
    ? parseFloat(mat.item.current.price.replace(/,/, ''))
    : mat.item.current.price
}
