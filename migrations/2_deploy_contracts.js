var HelloErc20 = artifacts.require("./HelloErc20.sol");

module.exports = function(deployer, network, accounts) {
    deployer.deploy(HelloErc20);
};
