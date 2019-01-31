import axios from 'axios'

export default {
  items: {
    getOne: itemName =>
      axios
        .post('/items/json', {
          itemName
        })
        .then(res => res.data)
  }
}
