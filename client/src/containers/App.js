import React, { Component } from 'react'
import { Card, CardContent, Typography, Input, Button } from '@material-ui/core'

class App extends Component {
  state = {
    show: false,
    results: ''
  }

  callApi = () => {
    fetch('http://localhost:8080/test', {
      mode: 'cors'
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          show: true,
          results: json.item.name
        })
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
            <Input />
            <Button
              style={{ width: '20px', margin: '1rem auto 0 auto' }}
              onClick={() => this.callApi()}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
        {this.state.show && (
          <Card>
            <CardContent>
              <Typography variant="h5">{this.state.results}</Typography>
            </CardContent>
          </Card>
        )}
      </React.Fragment>
    )
  }
}

export default App
