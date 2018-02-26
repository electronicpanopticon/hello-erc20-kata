const mlog = require('mocha-logger');
const util = require('util');
require('chai').should();

const HelloErc20 = artifacts.require('HelloERC20');

contract('HelloERC20', ([owner]) => {
  describe('Given that I have a Token Contract', () => {
    it('it should have the correct name', async () => {
      const hello_erc20 = await HelloErc20.new({ from: owner });
      const name = await hello_erc20.name();
      name.should.be.equal("Hello ERC20 Coin");
    });
  });
});
