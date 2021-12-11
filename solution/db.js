const fs = require("fs")

const writeToDatabase = (text) => {
  // use fs node module to write a db record to our text file
  fs.appendFile('dbRecords.txt', text + `\n`, (err) => {
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


module.exports = {
  writeToDatabase,
  readFromDatabase,
}