pragma solidity ^0.4.4;

contract HelloErc20 {
  string public name = "Hello ERC20 Coin";
  string public symbol = "HE2";
  uint8 public decimals = 18;

  function totalSupply() public constant returns (uint) {
    return 1000000 * 10 ** uint(decimals);
  }
}
