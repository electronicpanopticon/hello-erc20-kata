const BigNumber = web3.BigNumber;
const mlog = require('mocha-logger');
const util = require('util');

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

const HelloErc20 = artifacts.require('HelloERC20');

contract('HelloERC20', ([owner]) => {
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
    });
  });
});

function toWei(count) {
  return count * 10 ** 18
}
