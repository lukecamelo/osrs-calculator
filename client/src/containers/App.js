import React, { useState, useReducer } from 'react'
import { Card, CardContent, Typography, Input, Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import api from '../services/api'

const initialState = {
  results: '',
  costTotal: 0,
  itemPrice: 0,
  profit: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetch_margin_data':
      return {
        ...state,
        results: action.payload.item,
        costTotal: action.payload.materialCost,
        itemPrice: action.payload.itemPrice,
        profit: action.payload.profit
      }
    default:
      return state
  }
}

function useInput(initialValue) {
  const [input, setInput] = useState(initialValue)

  function handleChange(e) {
    setInput(e.target.value)
  }
  return {
    value: input,
    onChange: handleChange
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  let input = useInput('')

  const fetchItemMargin = name => {
    setShowSpinner(true)
    // api.items.getMargin(name).then(json => {
    //   dispatch({ type: 'fetch_margin_data', payload: json })
    //   setShowSpinner(false)
    //   setHasLoaded(true)
    // })
    api.items.allMargins().then(json => {
      console.log(json)
      setShowSpinner(false)
      setHasLoaded(true)
    })
  }

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
          <Input name="inputValue" {...input} />
          <Button
            style={{ width: '20px', margin: '1rem auto 0 auto' }}
            onClick={() => fetchItemMargin(input.value)}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
      {hasLoaded && (
        <Card style={{ margin: '3rem auto', width: '400px' }}>
          <CardContent
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div>
              <img src={state.results.item.icon_large} alt="item icon" />
              <Typography variant="h5">
                material cost total: {state.costTotal}gp
              </Typography>
              <Typography variant="h5">
                item cost: {state.itemPrice}gp
              </Typography>
              <Typography variant="h5">profit: {state.profit}gp</Typography>
            </div>
          </CardContent>
        </Card>
      )}
      {showSpinner && (
        <Card style={{ margin: '3rem auto', width: '400px' }}>
          <CardContent
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  )
}

export default App
