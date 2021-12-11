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
  addUser(userName, password) {
    if (password === this.password) {
      this.users.push(userName)
      return console.log(`${userName} has been added to this account.`)
    }
    return console.log('Incorrect password')
  }

  //removeUser should remove a user from the authorized users array
  //there must be at least 1 user on an account
  //it should return a confirmation message if successful 
  removeUser(userName, password) {
    if (this.users.length === 1) return console.log('You cannot remove the only user from an account.')
    if (password === this.password) {
      this.users = this.users.filter(name => name !== userName)
      return `${userName} has been removed from this account.`
    }
    return console.log('Incorrect password')
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
    if (this.funds >= amount) {
      this.funds -= amount
      return true
    }
    return false
  }


}


const newAccount = new Account('Vacation', 1, 5000, 'password')

newAccount.depositFunds(1)
console.log('deposit', newAccount)

newAccount.withdrawlFunds(101)
console.log('withdrawl', newAccount)

console.log(newAccount.withdrawlFunds(5000))
console.log('overdraft', newAccount)




module.exports = {
  Account
}