const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        age: Int!
        gender: String
        email: String!
        password: String!
        image: String        
    }

    type Todos {
        id: ID!
        todo: String!
        completed: Boolean!
        userId: ID!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        todos: [Todos!]!
        userSpecificTodos(userId: ID!): [Todos!]!
    }
`;

// These exclamation marks in Query ( [User!]! ) say that User can not be null, and the outer mark says that the array ca not be null but it can be empty.

module.exports = { typeDefs };