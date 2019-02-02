import React, { Component } from 'react'
import { Card, CardContent, Typography, Input, Button } from '@material-ui/core'
import api from '../services/api'

class App extends Component {
  state = {
    inputValue: '',
    show: false,
    results: '',
    costTotal: 0,
    itemPrice: 0,
    profit: 0
  }

  displayItem = name => {
    api.items.getMargin(name).then(json => {
      console.log(json.profit)
      this.setState({
        show: true,
        results: json.item,
        costTotal: json.materialCost,
        itemPrice: json.itemPrice,
        profit: json.profit
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
              onClick={() => this.displayItem(this.state.inputValue)}
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
                <img src={this.state.results.item.icon_large} alt="item icon" />
                <Typography variant="h5">
                  material cost total: {this.state.costTotal}gp
                </Typography>
                <Typography variant="h5">
                  item cost: {this.state.itemPrice}gp
                </Typography>
                <Typography variant="h5">
                  profit: {this.state.profit}gp
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
