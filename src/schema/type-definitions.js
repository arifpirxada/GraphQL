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

    input CreateUserInput {
        firstName: String!
        lastName: String!
        age: Int
        gender: String
        email: String!
        password: String!
        image: String = "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww"
    }

    input UpdateUserNameInput {
        id: ID!
        firstName: String!
        lastName: String!
    }

    input TodoInput {
        todo: String!
        userId: ID!
    }

    input UpdateTodoInput {
        todo: String!
        id: ID!
    }

    type Mutation {
        createUser(input: CreateUserInput): User
        updateUser(input: UpdateUserNameInput): User
        createTodo(input: TodoInput): Todos
        updateTodo(input: UpdateTodoInput): Todos
    }
`;

// Image in createUserInput has a default value

module.exports = { typeDefs };