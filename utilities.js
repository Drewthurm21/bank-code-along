const fs = require("fs")

//feel free to checkout the docs for fs at https://nodejs.org/api/fs.html

const writeToDatabase = (text) => {
  // use fs node module to write a db record to our text file
  fs.appendFile('dbRecords.txt', text, (err) => {
    if (err) return console.error(err);
  });
  console.log("Data written successfully!");
}


const readFromDatabase = () => {
  console.log("Let's read newly written data");
  // Read the newly written file and print all of its content on the console
  fs.readFile('dbRecords.txt', (err, data) => {
    if (err) {
      return console.error(err);
    }
    console.log("Asynchronous read: " + data.toString());
  });
}


const user1 = {
  'accountName': 'Pizza fund',
  'firstName': 'Drew',
  'lastName': 'Thurman',
  'funds': 100,
  'password': 123456
}


const user2 = {
  'accountName': 'Taco fund',
  'firstName': 'Jeff',
  'lastName': 'Granoff',
  'funds': 100,
  'password': 999999
}

const user3 = {
  'accountName': 'Sushi fund',
  'firstName': 'Kristen',
  'lastName': 'Chauncey',
  'funds': 100,
  'password': 428567
}

module.exports = {
  writeToDatabase,
  readFromDatabase,
  user1,
  user2,
  user3
}
