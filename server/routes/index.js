const express = require('express')
const router = express.Router()
const itemController = require('../controllers/item.controller')

router.post('/json', itemController.returnItemsJson, (req, res) => {
  return req.data
})

router.post('/calctest', itemController.addMaterialCosts, (req, res) => {
  // return req.data
})

module.exports = router
