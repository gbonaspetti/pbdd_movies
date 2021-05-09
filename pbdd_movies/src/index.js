import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Homepage from './Homepage.jsx'

ReactDOM.render(
    <BrowserRouter>
      <Homepage />
    </BrowserRouter>
  , document.getElementById('root')
)
