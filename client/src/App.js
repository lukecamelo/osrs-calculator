import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  callApi = () => {
    fetch('/test')
      .then(res => res.json())
      .then(json => console.log('hello', json))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>hello world</p>
          <button onClick={() => this.callApi()}>clicc</button>
        </header>
      </div>
    )
  }
}

export default App
