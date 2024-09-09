import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context'
import App from "./App.jsx";

const authLink = setContext((request, previousContext) => {
  const token = localStorage.getItem('library-user-token')
  return {
    headers: {
      ...previousContext.headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
}) 

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  uri: 'http://localhost:4000', 
  link: authLink.concat(httpLink),
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
