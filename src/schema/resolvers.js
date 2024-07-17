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

        return "user"
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
            returnUser = user;
            return {
              ...user,
              firstName: userToBeUpdated.firstName,
              lastName: userToBeUpdated.lastName
            };
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
    }
  }
};

module.exports = { resolvers };