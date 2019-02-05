import axios from 'axios'

export default {
  items: {
    getOne: itemName =>
      axios
        .post('/items/json', {
          itemName
        })
        .then(res => res.data),
    getMargin: itemName =>
      axios
        .post('/items/item-margin', {
          itemName
        })
        .then(res => res.data)
  }
}
