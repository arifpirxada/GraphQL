const fs = require('fs');
const path = require('path');

const getData = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
};

const setData = (filePath, data) => {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data, null, 4);
    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error('Error writing to file', err);
        return reject(err);
      }
      resolve(true)
    });
  });
}

const resolvers = {
  Query: {
    // User Queries =>
    users: async () => {
      try {
        const userData = await getData(path.join(__dirname, '../data', 'users.json'));
        return userData;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching user data');
      }
    },

    user: async (parent, args) => {
      try {
        const userData = await getData(path.join(__dirname, '../data', 'users.json'));
        const user = userData.find(user => user.id == args.id);
        return user;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching user data');
      }
    },


    // Todo Queries 
    todos: async () => {
      try {
        const todoData = await getData(path.join(__dirname, '../data', 'todos.json'));
        return todoData;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching todos data');
      }
    },

    userSpecificTodos: async (parent, args) => {
      try {
        const todoData = await getData(path.join(__dirname, '../data', 'todos.json'));
        const specificTodos = todoData.filter(todo => todo.userId == args.userId);
        return specificTodos;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching todos data');
      }
    }
  },
  Mutation: {
    createUser: async (parent, args) => {
      try {
        const userData = await getData(path.join(__dirname, '../data', 'users.json'));
        const user = args.input;
        user.id = userData.length + 2;
        userData.push(user)

        if (setData(path.join(__dirname, '../data', 'users.json'), userData)) {
          console.log("User has been created!")
        }

        return user
      } catch (error) {
        console.error(error);
        throw new Error('Error occured while creating user');
      }
    },

    updateUser: async (parent, args) => {
      try {
        const userData = await getData(path.join(__dirname, '../data', 'users.json'));
        userToBeUpdated = args.input
        let returnUser;
        const updatedUserData = userData.map(user => {
          if (user.id == userToBeUpdated.id) {
            let curr_user = {
              ...user,
              firstName: userToBeUpdated.firstName,
              lastName: userToBeUpdated.lastName
            };
            returnUser = curr_user;
            return curr_user;
          } else {
            return user;
          }
        });

        if (setData(path.join(__dirname, '../data', 'users.json'), updatedUserData)) {
          console.log("User has been updated!")
        }

        return returnUser;
      } catch (error) {
        console.error(error);
        throw new Error('Error occured while updating user');
      }
    },

    createTodo: async (parent, args) => {
      try {
        const todoData = await getData(path.join(__dirname, '../data', 'todos.json'));
        const todo = args.input;
        todo.id = todoData.length + 2;
        todo.completed = false
        todoData.push(todo)

        if (setData(path.join(__dirname, '../data', 'todos.json'), todoData)) {
          console.log("Todo has been created!")
        }
        return todo
      } catch (error) {
        console.error(error);
        throw new Error('Error occured while creating Todo');
      }
    },

    updateTodo: async (parent, args) => {
      try {
        const todoData = await getData(path.join(__dirname, '../data', 'todos.json'));
        let todoToBeUpdated = args.input
        let returnTodo;
        const updatedTodoData = todoData.map(todo => {
          if (todo.id == todoToBeUpdated.id) {
            let curr_todo = {
              ...todo,
              todo: todoToBeUpdated.todo
            };
            returnTodo = curr_todo;
            return curr_todo;
          } else {
            return todo;
          }
        });
        if (setData(path.join(__dirname, '../data', 'todos.json'), updatedTodoData)) {
          console.log("Todo has been updated!")
        }

        return returnTodo;
      } catch (error) {
        console.error(error);
        throw new Error('Error occured while updating Todo');
      }
    },
  }
};

module.exports = { resolvers };