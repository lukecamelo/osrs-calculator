import React, { Component } from 'react'
import { Card, CardContent, Typography, Input, Button } from '@material-ui/core'
import axios from 'axios'

class App extends Component {
  state = {
    inputValue: '',
    show: false,
    results: ''
  }

  callApi = itemName => {
    axios
      .post('http://localhost:8080/items/json', {
        itemName
      })
      // .then(res => res.json())
      // .then(res => console.log(res))
      .then(json => {
        console.log('json desu ', json)
        this.setState({
          show: true,
          results: json.data.item.icon
        })
      })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <React.Fragment>
        <Card style={{ margin: '3rem auto', width: '400px' }}>
          <CardContent
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h5">Pick an item!</Typography>
            <Input
              name="inputValue"
              value={this.state.inputValue}
              onChange={this.handleChange}
            />
            <Button
              style={{ width: '20px', margin: '1rem auto 0 auto' }}
              onClick={() => this.callApi(this.state.inputValue)}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
        {this.state.show && (
          <Card>
            <CardContent>
              {/* <Typography variant="h5">{this.state.results}</Typography> */}
              <img
                src={this.state.results}
                style={{ width: '500px', height: '500px' }}
              />
            </CardContent>
          </Card>
        )}
      </React.Fragment>
    )
  }
}

export default App
