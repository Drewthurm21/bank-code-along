const { Account } = require('./account')
const { writeToDatabase, readFromDatabase, user1, user2, user3 } = require('./utilities')

class Bank {
  constructor(name, location, capital = 0, accounts = []) {
    this.name = name
    this.location = location
    this.capital = capital
    this.accounts = accounts
    this.nextAccountNumber = -1
  }

  //--REFACTOR
  //openAccount should create a new account for a customer
  // --account numbers should be assigned sequentially, starting with 0
  //it should accept a customer or customers as an array of customers to be authorized users
  //it should add the account funds to total bank capital
  //it should store a record in the database
  openAccount(accountName, users, password, funds) {
    this.nextAccountNumber++
    const newAccount = new Account(accountName, this.nextAccountNumber, users, password, funds)
    this.capital += funds
    this.accounts.push(newAccount)

    // create a string representation of the account (as an object)
    let dbEntry = (`
New Account Added:
${newAccount.accountNumber} : {
  'accountName':${newAccount.accountName},
  'users':${newAccount.users},
  'password':${newAccount.password},
  'funds':${newAccount.funds}}`)
    // pass the string instead of the Account class instance
    writeToDatabase(dbEntry)
  }

  //--REFACTOR
  //closeAccount should close the intended account for a customer
  //it should not remove the account from our array
  //it should remove the funds from bank capital 
  //it should store a record in the database
  //customer password and account number are required
  closeAccount(firstName, lastName, password) {
    let account = this.accounts.find(account => firstName === account.firstName && lastName === account.lastName)

    if (!account) {
      return console.log(`We're sorry, we couldn't find your account.`)
    }

    if (account.password === password) {
      this.capital -= account.funds
      this.accounts = this.accounts.filter(el => el !== account)
      return console.log(`We have closed the account for ${firstName} ${lastName}.  Sorry to see you go!`)
    } else {
      return console.log('Password incorrect')
    }
  }

  //--REFACTOR
  //checkAccount should return all account information
  //customer password and account number are required
  checkAccount(userName, accountNumber, password) {
    let account = this.accounts.find(account => firstName === account.firstName && lastName === account.lastName)
    if (!account) {
      return `We're sorry, ${firstName} ${lastName} doesn't have an account here.`
    }

    if (password === account.password) {
      return account
    } else {
      return 'The password you provided is incorrect!'
    }
  }


  //processDeposit should deposit funds into the customer account
  //it should add the funds to the bank's total capital
  //it should return the new account balance
  //it should store a record in the database
  processDeposit(accountNumber, amount) {

  }

  //processWithdrawl should allow a customer to withdrawl funds from one of their accounts.
  //it should remove the funds from the account and bank capital if able
  //it should return the new account balance.
  //it should store a record in the database
  processWithdrawl(accountNumber, amount) {

  }

  //addUserToAccount should do just that... =|
  addUserToAccount(accountNumber, userName, password) {

  }

  //u already knowwww
  removeUserFromAccount(accountNumber, userName, Password) {

  }


  //listAccounts should 
  listAccounts() {
    for (const account of this.accounts) {
      console.log(account)
    }
  }
}




// const myBank = new Bank('Free Money Bank', 'USA', 10000)
// console.log(`OPEN NEW BANK`, myBank)

// myBank.openAccount('Vacation', ['Drew'], 123456, 5000)
// myBank.openAccount('Vacation', ['Jeff'], 123456, 5000)
// myBank.openAccount('Vacation', ['Kristen'], 123456, 5000)
// console.log(` \n OPEN NEW ACCOUNTS \n `, myBank)

// myBank.processDeposit(0, 5000, 123456)
// myBank.processDeposit(1, 5000, 123456)
// myBank.processDeposit(2, 5000, 123456)
// myBank.processDeposit(5, 5000, 123456)
// console.log(` \n PROCESS NEW DEPOSITS \n `, myBank)

// myBank.processWithdrawl(0, 7500, 123456)
// myBank.processWithdrawl(1, 7500, 123456)
// myBank.processWithdrawl(2, 7500, 123456)
// myBank.processWithdrawl(2, 17500, 123456)
// console.log(` \n PROCESS NEW WITHDRAWLS \n`, myBank)

// myBank.addUserToAccount(0, 'Nathaniel Thurman', 123456)
// console.log(myBank.checkAccount(1, 123456))

// myBank.removeUserFromAccount(0, 'Nathaniel Thurman', 123456)
// console.log(myBank.checkAccount(1, 123456))

// console.log(myBank)

// myBank.closeAccount(0, 123456)
// myBank.closeAccount(1, 123456)
// myBank.closeAccount(2, 123456)
// console.log(` \n CLOSE THE ACCOUNTS \n `, myBank)
