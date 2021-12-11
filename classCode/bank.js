const { write } = require('fs')
const { Account } = require('./account')
const { writeToDatabase, readFromDatabase, user1, user2, user3 } = require('./utilities')

class Bank {
  constructor(name, location, capital = 0, accounts = []) {
    this.name = name
    this.location = location
    this.capital = capital
    this.accounts = accounts
  }

  //--REFACTOR
  //openAccount should create a new account for a customer
  // --account numbers should be assigned sequentially, starting with 0
  //it should accept a customer or customers as an array of customers to be authorized users
  //it should add the account funds to total bank capital
  //it should store a record in the database
  openAccount(accountName, users, password, funds) {
    const newAccount = new Account(accountName, this.accounts.length, users, password, funds)
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
  closeAccount(accountNumber, password) {
    let account = this.checkAccount(accountNumber, password)
    if (!account) return console.log('Account not found')

    this.capital -= account.funds
    account.funds = 0
    account.isActive = false
    let dbEntry = `Account ${accountNumber} has been closed.`
    writeToDatabase(dbEntry)
  }

  //--REFACTOR
  //checkAccount should return all account information
  //customer password and account number are required
  checkAccount(accountNumber, password) {
    return this.accounts.find(account => account.password === password && accountNumber === account.accountNumber)
  }


  //processDeposit should deposit funds into the customer account
  //it should add the funds to the bank's total capital
  //it should return the new account balance
  //it should store a record in the database
  processDeposit(accountNumber, password, funds) {
    const newAccount = this.checkAccount(accountNumber, password)
    if (!newAccount) return console.log('Account not found')
    this.capital += funds
    newAccount.depositFunds(funds)
    let dbEntry = (`
    Deposit processed:
    ${newAccount.accountNumber} : {
      'accountName':${newAccount.accountName},
      'users':${newAccount.users},
      'password':${newAccount.password},
      'funds':${newAccount.funds}}`)
    writeToDatabase(dbEntry)
  }

  //processWithdrawl should allow a customer to withdrawl funds from one of their accounts.
  //it should remove the funds from the account and bank capital if able
  //it should return the new account balance.
  //it should store a record in the database.
  processWithdrawl(accountNumber, password, funds) {
    const newAccount = this.checkAccount(accountNumber, password)
    if (!newAccount) return console.log('Account not found')

    if (newAccount.withdrawlFunds(funds)) {

      this.capital -= funds
    } else {
      return console.log(`Don't do that, please!  We don't allow robberies!  =[ \n \n Do ya like Jazzzzzzzzzzz? `)
    }

    let dbEntry = (`
    Deposit processed:
    ${newAccount.accountNumber} : {
      'accountName':${newAccount.accountName},
      'users':${newAccount.users},
      'password':${newAccount.password},
      'funds':${newAccount.funds}}`)
    writeToDatabase(dbEntry)

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




const myBank = new Bank('Free Money Bank', 'USA', 10000)
console.log(`OPEN NEW BANK`, myBank)

myBank.openAccount('Vacation', ['Drew'], 123456, 5000)
myBank.openAccount('Vacation', ['Jeff'], 123456, 5000)
myBank.openAccount('Vacation', ['Kristen'], 123456, 5000)
console.log(` \n OPEN NEW ACCOUNTS \n `, myBank)

console.log(myBank.checkAccount(0, 123456))

myBank.processDeposit(0, 123456, 5000)
myBank.processDeposit(1, 123456, 5000)
myBank.processDeposit(2, 123456, 5000)
myBank.processDeposit(5, 123456, 5000)
console.log(` \n PROCESS NEW DEPOSITS \n `, myBank)

myBank.processWithdrawl(0, 123456, 7500)
myBank.processWithdrawl(1, 123456, 7500)
myBank.processWithdrawl(2, 123456, 7500)
myBank.processWithdrawl(2, 123456, 17500)
console.log(` \n PROCESS NEW WITHDRAWLS \n`, myBank)

// myBank.addUserToAccount(0, 'Nathaniel Thurman', 123456)
// console.log(myBank.checkAccount(1, 123456))

// myBank.removeUserFromAccount(0, 'Nathaniel Thurman', 123456)
// console.log(myBank.checkAccount(1, 123456))

// console.log(myBank)

// myBank.closeAccount(0, 123456)
// myBank.closeAccount(1, 123456)
// myBank.closeAccount(2, 123456)
// console.log(` \n CLOSE THE ACCOUNTS \n `, myBank)
