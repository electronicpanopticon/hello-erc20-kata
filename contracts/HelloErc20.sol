  pragma solidity ^0.4.4;

  contract HelloErc20 {
    string public name = "Hello ERC20 Coin";
    string public symbol = "HE2";
    uint8 public decimals = 18;
    address public owner;

    uint256 fixedSupply = 1000000 * 10 ** uint(decimals);

    mapping(address => uint256) balances;

    function HelloErc20() public {
      owner = msg.sender;
      balances[owner] = fixedSupply;
    }

    function totalSupply() public constant returns (uint) {
      return fixedSupply;
    }

    function balanceOf(address _tokenOwner) public constant returns (uint256 balance) {
      return balances[_tokenOwner];
    }

    function transfer(address to, uint tokens) public returns (bool success) {
      require(msg.sender != to);
      balances[msg.sender] = balances[msg.sender] - tokens;
      balances[to] = balances[to] + tokens;
      return true;
    }
  }
