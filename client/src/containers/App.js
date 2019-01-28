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
      .post('/items/json', {
        itemName
      })
      .then(json => {
        console.log(json.data)
        this.setState({
          show: true,
          results: json.data.item
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
          <Card style={{ margin: '3rem auto', width: '400px' }}>
            <CardContent
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <img
                src={this.state.results.icon}
                alt="item icon"
                style={{ width: 'auto' }}
              />
              <Typography variant="h5">
                current price: {this.state.results.current.price}
              </Typography>
            </CardContent>
          </Card>
        )}
      </React.Fragment>
    )
  }
}

export default App
