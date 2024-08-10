# GraphQL Todo Management Project

This project is a full-stack application built with React on the frontend and Node.js on the backend, using Apollo Client and Apollo Server to handle GraphQL queries and mutations.

## Features

### Frontend
- **Fetch Todos**: Retrieve a list of todos.
- **Add Todos**: Create a new todo.
- **Search Todos**: Search through existing todos.

### Backend
- **User Management**: 
  - `createUser`: Add a new user.
  - `updateUser`: Update an existing user's details.
  - `fetchUsers`: Get a list of all users.
  - `fetchUser`: Get details of a specific user.
- **Todo Management**:
  - `createTodo`: Add a new todo.
  - `updateTodo`: Update an existing todo.
  - `fetchTodos`: Get a list of all todos.
  - `userSpecificTodos`: Get todos associated with a specific user.

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js (>= 14.x)
- npm (>= 6.x)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/arifpirxada/GraphQL.git
    cd GraphQL
    ```

2. **Install dependencies**:
    ```bash
    cd graphql-client
    npm install
    cd ..
    cd graphql-server
    npm install
    ```

### Running the Project

1. **Start the backend server**:
    ```bash
    npm run dev
    ```

2. **Start the frontend development server**:
    ```bash
    npm run dev
    ```

### Contributing

Feel free to fork the project and submit pull requests. Contributions are always welcome!

### License

This project is licensed under the MIT License.