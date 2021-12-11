const { writeToDatabase, readFromDatabase, user1, user2, user3 } = require('./db')
const { Account } = require('./account')

class Bank {
  constructor(name, location, capital = 0, accounts = []) {
    this.name = name
    this.location = location
    this.capital = capital
    this.accounts = accounts
  }

  openAccount(accountName, users, password, funds) {
    let accountNumber = this.accounts.length
    const newAccount = new Account(accountName, accountNumber, users, password, funds)
    this.capital += funds
    this.accounts.push(newAccount)
    let dbEntry = `Account Created:
    ${accountNumber}: {
      name: ${accountName}
      users: ${users}
      password: ${password}
      funds: ${funds}
    }
      `
    writeToDatabase(dbEntry)
  }


  closeAccount(accountNumber, password) {
    const account = this.accounts.find(account => account.accountNumber === accountNumber)
    if (!account) return console.log('Account not found')
    if (password !== account.password) return console.log('Incorrect password')
    if (password === account.password) {
      this.capital -= account.funds
      account.funds = 0
      account.isActive = false
      const dbEntry = `Account #${accountNumber} has been closed`
      writeToDatabase(dbEntry)
      return console.log(dbEntry)
    }
  }

  checkAccount(accountNumber, password) {
    const account = this.accounts.find(account => account.accountNumber === accountNumber && password === password)
    return account
  }

  processDeposit(accountNumber, amount, password) {
    const account = this.checkAccount(accountNumber, password)
    if (!account) return console.log('Account not found')
    account.depositFunds(amount)
    this.capital += amount
    return console.log(`Deposit successful! \n New total: ${account.funds}`)
  }

  processWithdrawl(accountNumber, amount, password) {
    const account = this.checkAccount(accountNumber, password)
    if (!account) return console.log('Account not found')

    if (account.withdrawlFunds(amount)) {
      this.capital -= amount
      return console.log(`Withdrawl successful! \n New total: ${account.funds}`)
    } else {
      return console.log('Not enough funds.')
    }
  }

  addUserToAccount(accountNumber, userName, password) {
    const account = this.checkAccount(accountNumber, password)
    if (!account) return console.log('Account not found')
    account.users.push(userName)
    console.log(`${userName} was successfully added.`)
    return account
  }

  removeUserFromAccount(accountNumber, userName, password) {
    const account = this.checkAccount(accountNumber, password)
    if (!account) return console.log('Account not found')
    account.users = account.users.filter(user => user !== userName)
    console.log(`${userName} was successfully removed.`)
    return account
  }

  calculateBuyingPower() {
    let accountsTotal = 0
    for (const account of this.accounts) {
      accountsTotal += account.funds
    }
    return this.capital - accountsTotal
  }


  //bonus - make a function that pays out interest to the customers.
  // hint - what happens if we've paid so much interest that the bank is in debt?
  payInterest(interestRate) {

  }


  //bonus - make a function that charges each account $10 in monthly fees. 
  //      - Remember:  No overdrafts!
  // hint - what happens if the customer doesn't have enough money to pay the fees?
  chargeFees() {

  }

  printAccounts() {
    for (const account of this.accounts) {
      console.log(account)
    }
  }
}



//bonus - implement a loan system.
//bonus - implement measures to assure the bank's customers are all unique users.

//bonus - refactor - make all accounts keep a minimum balance.
//bonus - refactor - make all users on accounts have their own password.
//bonus - refactor - implement a way have different account types that don't incur monthly fees.
//bonus - refactor - implement a way have different account types that earn different amounts of interest.



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
