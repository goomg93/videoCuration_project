import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import { Reset } from 'styled-reset';

ReactDOM.render(
  <React.StrictMode>
    <Reset />
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);
