const BigNumber = web3.BigNumber;
const mlog = require('mocha-logger');
const util = require('util');

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

const HelloErc20 = artifacts.require('HelloERC20');

contract('HelloERC20', ([owner, holder, receiver, nilAddress]) => {
  const TOKEN_COUNT = 1000000;

  beforeEach(async () => {
    this.hello_erc20 = await HelloErc20.new({ from: owner });
  });
  describe('Given that I have a Token Contract', () => {
    it('it should have the correct name', async () => {
      const name = await this.hello_erc20.name();
      name.should.be.equal("Hello ERC20 Coin");
    });
    it('it should have the correct symbol', async () => {
      const symbol = await this.hello_erc20.symbol();
      symbol.should.be.equal("HE2");
    });
    it('it should have the correct decimal level', async () => {
      const decimals = await this.hello_erc20.decimals();
      decimals.should.be.bignumber.equal(18);
    });

    describe('Given that I have a fixed supply of tokens', () => {
      it('it should return the total supply of tokens for the Contract', async () => {
        const supply = await this.hello_erc20.totalSupply();
        supply.should.be.bignumber.equal(toWei(TOKEN_COUNT));
      });
      it('the owner should have all the tokens when the Contract is created', async () => {
        const balance = await this.hello_erc20.balanceOf(owner);
        balance.should.be.bignumber.equal(toWei(TOKEN_COUNT));
      });
      it('any account should have the tokens transfered to it', async () => {
        const amount = toWei(10);
        await this.hello_erc20.transfer(holder, amount)
        const balance = await this.hello_erc20.balanceOf(holder);
        balance.should.be.bignumber.equal(amount);
      });
      it('an address that has no tokens should return a balance of zero', async () => {
        const balance = await this.hello_erc20.balanceOf(nilAddress);
        balance.should.be.bignumber.equal(0);
      });
      describe('Given that I want to be able to transfer tokens', () => {
        it('it should not let me transfer tokens to myself', async () => {
          var hasError = true;
          try {
            const amount = toWei(10);
            await this.hello_erc20.transfer(owner, amount, { from: owner })
            hasError = false; // Should be unreachable
          } catch(err) { }
          assert.equal(true, hasError, "Function not throwing exception on transfer to self");
        });
        it('it should not let someone transfer tokens they do not have', async () => {
          var hasError = true;
          try {
            await this.hello_erc20.transfer(holder, toWei(10), { from: owner })
            await this.hello_erc20.transfer(receiver, toWei(20), { from: holder })
            hasError = false;
          } catch(err) { }
          assert.equal(true, hasError, "Insufficient funds");
        });
      });
    });
  });
});

function toWei(count) {
  return count * 10 ** 18
}
