# Hello ERC20 Kata

Simple kata to create an ERC20 fixed supply Token.

## Setup

* Install [Homebrew](https://brew.sh/)
* Install [Node](https://nodejs.org/)
* Install [Geth](https://www.ethereum.org/cli)
```
$> brew update
$> brew upgrade
$> brew tap ethereum/ethereum
$> brew install ethereum
```
* Install [Truffle](http://truffleframework.com/) and [ganache-cli](https://github.com/trufflesuite/ganache-cli)
```
$> npm install -g truffle
$> npm install -g ganache-cli
```

## Testing

* In one console, start ganache-cli
```
$> ganache cli
```

* In a separate console, run truffle test
```
$> truffle test
```

## Requirements

### Iteration 1 - Basic Token

#### Feature: Create a Basic Token Class
```
As a Token Contract I want to have a name, and symbol that distinguishes me.
```
* Can get the Token's name as a public field
* Can get the Token's three character symbol as a public field

#### Feature: Decimal level
```
As a Token Contract I want to set the decimal level.
```
* Can get the Token's decimal level as a public field

#### Feature: Fixed Token Supply
```
As a Token Contract I want a fixed supply of Tokens assigned to the creator
```
* public view function totalSupply() returns a uint256 with the total supply of tokens
* public view function balanceOf() returns a uint256 the supply of tokens for the address passed in

#### Feature: Transfer Tokens
```
As a Token holder I want to be able to transfer them to another address.
```
* public transfer function
* pass in target address and amount of tokens
* does not allow user to send tokens to self
* does not allow user to send tokens they don't have
* returns if successful or not

#### Feature: Emits Transfer Event
```
As a Token Contract I want to emit a Transfer event when the transfer function is called.
```
* Should be able to read a Transfer Event off of the event logs

### Iteration 2 - ERC20 Token

#### Feature: Allowance
```
As an Blockchain User I want to be able to see how many tokens a Token holder has allowed someone else to spend on their behalf.
```
* passing in owner and spender addresses returns amount
* returns zero if none have been approbed

#### Feature: Approve
```
As a token holder I want to allow another address to transfer tokens on my behalf.
```
* passing in address of spender and amount returns true if possible
* emits an Approval event when successful

#### Feature: Transfer From
```
As a third party I want to be able to transfer Token from one address to another when I've been approved.
```
* Approved third party address is able to transfer tokens from an approved address to another address
* Emits a Transfer Event



