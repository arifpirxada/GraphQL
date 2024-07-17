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
        const specificTodos = todoData.filter(todo => todo.userId == args.userId)
        return specificTodos;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching todos data');
      }
    }
  },
};

module.exports = { resolvers };