//create an account class with the following properties
//accountName, accountNumber, funds, users & password

class Account {
  constructor(accountName, accountNumber, users = [], password, funds) {
    this.accountName = accountName
    this.accountNumber = accountNumber
    this.funds = funds
    this.password = password
    this.users = users
    this.isActive = true
  }


  //addUser should add a user to the authorized users array
  //there can be a maximum of 10 users per account
  addUser(userName) {
    if (this.users.length < 10) {
      this.users.push(userName)
    } else {
      return
    }
  }

  //removeUser should remove a user from the authorized users array
  //there must be at least 1 user on an account
  removeUser(userName) {
    this.users = this.users.filter(user => user !== userName)
  }

  //depositFunds should deposit funds into the account
  //should return the new total funds
  depositFunds(amount) {
    this.funds += amount
    return this.funds
  }

  //withdrawlFunds should withdrawl funds from the account. 
  //we do not allow overdraft.
  //it should return the new account balance if successful or false if unsuccessful.
  //can you spot the edge case?
  withdrawlFunds(amount) {
    if (amount < this.funds) {
      return this.funds -= amount
    } else if (amount === this.funds) {
      return `${this.funds}`
    } else {
      return false
    }
  }
}

// const newAccount = new Account('Vacation', 1, ['Drew'], 'password', 5000)
// console.log(newAccount)

// newAccount.addUser('Jeff')
// newAccount.addUser('Kristen')
// console.log('after adding users', newAccount)

// newAccount.removeUser('Jeff')
// newAccount.removeUser('Kristen')
// console.log('after removing users', newAccount)


// newAccount.depositFunds(1000)
// console.log('after deposit', newAccount)


// newAccount.withdrawlFunds(101)
// console.log('withdrawl', newAccount)

// console.log(newAccount.withdrawlFunds(10000))
// console.log('overdraft', newAccount)

module.exports = {
  Account
}