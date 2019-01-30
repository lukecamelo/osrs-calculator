import React, { Component } from 'react'
import { Card, CardContent, Typography, Input, Button } from '@material-ui/core'
import axios from 'axios'
import api from '../services/api'

class App extends Component {
  state = {
    inputValue: '',
    show: false,
    results: ''
  }

  displayItem = name => {
    // console.log(api)
    // api.items
    //   .getOne(name)
    //   .then(json => this.setState({ show: true, results: json.data.item }))
    axios
      .post('items/json', {
        name
      })
      .then(res => console.log(res.data))
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
              // onClick={() => this.callApi(this.state.inputValue)}
              onClick={() =>
                this.displayItem(this.state.inputValue.toLowerCase())
              }
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
              <div>
                <img src={this.state.results.icon} alt="item icon" />
                <Typography variant="h5">
                  current price: {this.state.results.current.price}gp
                </Typography>
              </div>
            </CardContent>
          </Card>
        )}
      </React.Fragment>
    )
  }
}

export default App
