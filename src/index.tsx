import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
//import { setContext } from '@apollo/client/link/context';
import './index.css';
import App from './App';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include'
});

// const authLink = setContext((_, { headers }) => {
  
//   const token = localStorage.getItem('token');

//   return {
//     headers: {
//       ...headers,
//       cookie: token ? `${token}` : "",
//     }
//   }
// });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
  credentials: 'include',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

