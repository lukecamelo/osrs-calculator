import React, { useState, useReducer } from 'react'
import { Card, CardContent, Typography, Input, Button } from '@material-ui/core'
import api from '../services/api'

const initialState = {
  show: false,
  results: '',
  costTotal: 0,
  itemPrice: 0,
  profit: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'show':
      return {
        ...state,
        show: true,
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
  let input = useInput('')

  const displayItem = name => {
    api.items.getMargin(name).then(json => {
      dispatch({ type: 'show', payload: json })
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
            onClick={() => displayItem(input.value)}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
      {state.show && (
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
    </React.Fragment>
  )
}

export default App
