import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import { default as state } from './InitialStates';

render(
  <BrowserRouter>
    <App data={state}/>
  </BrowserRouter>,
  document.getElementById('root')
);
