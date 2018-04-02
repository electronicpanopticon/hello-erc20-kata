pragma solidity ^0.4.4;

// ----------------------------------------------------------------------------
// Safe math
// (c) BokkyPooBah / Bok Consulting Pty Ltd 2017. The MIT Licence.
// https://theethereum.wiki/w/index.php/ERC20_Token_Standard#Sample_Fixed_Supply_Token_Contract
// ----------------------------------------------------------------------------
library SafeMath {
  function add(uint a, uint b) internal pure returns (uint c) {
    c = a + b;
    require(c >= a);
  }
  function sub(uint a, uint b) internal pure returns (uint c) {
    require(b <= a);
    c = a - b;
  }
  function mul(uint a, uint b) internal pure returns (uint c) {
    c = a * b;
    require(a == 0 || c / a == b);
  }
  function div(uint a, uint b) internal pure returns (uint c) {
    require(b > 0);
    c = a / b;
  }
}

contract HelloErc20 {

  using SafeMath for uint;

  string public name = "Hello ERC20 Coin";
  string public symbol = "HE2";
  uint8 public decimals = 18;
  address public owner;

  uint256 fixedSupply = 1000000 * 10 ** uint(decimals);

  mapping(address => uint256) balances;
  mapping(address => mapping(address => uint256)) allowed;

  event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
  event Transfer(address indexed from, address indexed to, uint tokens);

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

  function transfer(address _to, uint _tokens) public returns (bool success) {
    require(msg.sender != _to);
    balances[msg.sender] = balances[msg.sender].sub(_tokens);
    balances[_to] = balances[_to].add(_tokens);
    Transfer(msg.sender, _to, _tokens);
    return true;
  }

  function allowance(address _tokenOwner, address _spender) public constant returns (uint remaining) {
    return allowed[_tokenOwner][_spender];
  }

  function approve(address _spender, uint _tokens) public returns (bool success) {
    allowed[msg.sender][_spender] = _tokens;
    Approval(msg.sender, _spender, _tokens);
    return true;
  }

  function transferFrom(address _from, address _to, uint _tokens) public returns (bool) {
    require(_tokens <= allowed[_from][msg.sender]);

    balances[_from] = balances[_from].sub(_tokens);
    balances[_to] = balances[_to].add(_tokens);
    allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_tokens);
    Transfer(_from, _to, _tokens);
    return true;
  }
}
