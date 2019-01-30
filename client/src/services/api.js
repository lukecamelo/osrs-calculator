import axios from 'axios'

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

export default {
  items: {
    getOne: name => {
      return axios
        .post('http://localhost:8080/items/json', {
          name
        })
        .then(res => console.log(res.data))
    }
  }
}
