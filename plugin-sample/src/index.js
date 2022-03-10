import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reduxModules';

let domain =
  window.location !== window.parent.location
    ? document.referrer
    : document.location.href;

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_EC2_SERVER}`,
});

const authLink = setContext(() => {
  return { headers: { authorization: 1234, domain: domain } };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          videoPagination: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

const store = createStore(allReducers);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
