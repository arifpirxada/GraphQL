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

    type Query {
        users: [User!]!
    }
`;

module.exports = { typeDefs };