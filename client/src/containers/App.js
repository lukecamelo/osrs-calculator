import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, Paper } from '@material-ui/core'

class App extends Component {
  callApi = () => {
    fetch('/test')
      .then(res => res.json())
      .then(json => console.log('hello', json))
  }

  render() {
    return (
      <div className="App">
        <Paper
          elevation={0}
          style={{ padding: 0, margin: 0, backgroundColor: '#fafafa' }}
        >
          <AppBar color="primary" position="static" style={{ height: 64 }}>
            <Toolbar style={{ height: 64 }}>
              <Typography color="inherit">OSRS CALCULATOR</Typography>
            </Toolbar>
          </AppBar>
          <p>what up</p>
        </Paper>
      </div>
    )
  }
}

export default App
