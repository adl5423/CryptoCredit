const CreditCardToken = artifacts.require("CreditCardToken");

contract("CreditCardToken", (accounts) => {
  let creditCardToken;
  const owner = accounts[0];
  const user = accounts[1];

  beforeEach(async () => {
    creditCardToken = await CreditCardToken.new();
  });

  it("should mint tokens for the specified user", async () => {
    const tokenId = 1;
    const amount = 1000;

    await creditCardToken.mint(user, tokenId, amount, { from: owner });

    const balance = await creditCardToken.balanceOf(user, tokenId);

    assert.equal(balance.toNumber(), amount, "Incorrect token balance after minting");
  });

  it("should burn tokens from the specified user", async () => {
    const tokenId = 1;
    const mintAmount = 1000;
    const burnAmount = 500;

    await creditCardToken.mint(user, tokenId, mintAmount, { from: owner });
    await creditCardToken.burn(user, tokenId, burnAmount, { from: owner });

    const balance = await creditCardToken.balanceOf(user, tokenId);

    assert.equal(balance.toNumber(), mintAmount - burnAmount, "Incorrect token balance after burning");
  });
});
