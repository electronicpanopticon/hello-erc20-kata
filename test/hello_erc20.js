contract('HelloErc20', function(accounts) {
  it("should assert true", function(done) {
    var hello_erc20 = HelloErc20.deployed();
    assert.isTrue(true);
    done();
  });
});
