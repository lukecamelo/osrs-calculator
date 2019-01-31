import axios from 'axios'

export default {
  items: {
    getOne: itemName =>
      axios
        .post('/items/json', {
          itemName
        })
        .then(res => res.data),
    test: itemName =>
      axios
        .post('/items/calctest', {
          itemName
        })
        .then(res => res.data)
  }
}
