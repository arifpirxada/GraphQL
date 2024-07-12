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
    users: async () => {
      try {
        const userData = await getData(path.join(__dirname, '../data', 'users.json'));
        return userData;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching user data');
      }
    },
  },
};

module.exports = { resolvers };