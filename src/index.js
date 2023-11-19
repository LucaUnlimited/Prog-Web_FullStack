import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

// Borrar el contenido HTML existente
document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById("app"));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
