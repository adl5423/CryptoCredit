const CreditPool = artifacts.require("CreditPool");
const TestToken = artifacts.require("TestToken");

contract("CreditPool", (accounts) => {
  let creditPool;
  let testToken;
  const owner = accounts[0];
  const user = accounts[1];

  beforeEach(async () => {
    testToken = await TestToken.new();
    creditPool = await CreditPool.new(testToken.address, 500, 30 * 24 * 60 * 60);
  });

  it("should add funds to the credit pool", async () => {
    const amount = 1000;

    await testToken.approve(creditPool.address, amount, { from: owner });
    await creditPool.addFunds(amount, { from: owner });

    const poolBalance = await testToken.balanceOf(creditPool.address);

    assert.equal(poolBalance.toNumber(), amount, "Incorrect credit pool balance after adding funds");
  });
});
