import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Reset } from 'styled-reset';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Reset />
    <Router />
  </ApolloProvider>,
  document.getElementById('root')
);
