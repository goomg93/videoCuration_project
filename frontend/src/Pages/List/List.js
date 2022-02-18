import React from 'react';
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import styles from './List.module.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// const GET_LIST = gql`
//   query GetList
// `;

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});
function List() {
  //   const [list, setList] = useState([]);

  //   const { loading, error } = useQuery(GET_LIST, {
  //     variables: { listid: '6209e35850bf57001e6c0d70' },
  //     onCompleted: data => {},
  // });

  return (
    <>
      <ApolloProvider client={client}>
        <h1>Hi, This is List Page</h1>
      </ApolloProvider>
    </>
  );
}

export default List;
