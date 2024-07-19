import "./App.css"
import Todo from "./components/Todo"
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
})

function App() {

  return (
    <ApolloProvider client={ client }>
      <div className="px-4 py-2">
        <h1 className="text-3xl text-center text-white font-bold my-16">Welcome to GraphQL Client 🚀</h1>
      </div>
      <Todo />
    </ApolloProvider>
  )
}

export default App
