const CreditCardNFT = artifacts.require("CreditCardNFT");
const CreditCardToken = artifacts.require("CreditCardToken");
const CreditPool = artifacts.require("CreditPool");

contract("CreditCardNFT", (accounts) => {
  let creditCardNFT, creditCardToken, creditPool;
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];

  beforeEach(async () => {
    creditCardToken = await CreditCardToken.new({ from: owner });
    creditPool = await CreditPool.new(creditCardToken.address, 10, 60 * 60 * 24 * 30, { from: owner }); // 10% interest rate and 30-day repayment period
    creditCardNFT = await CreditCardNFT.new(creditCardToken.address, creditPool.address, { from: owner });
  });  

  describe("Minting a new NFT", () => {
    it("should mint a new NFT", async () => {
      const tokenId = 1;
      const interestRate = 10;
      const dueDate = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;

      await creditCardNFT.requestNewCreditCard(interestRate, dueDate, { from: user1 });

      const nftOwner = await creditCardNFT.ownerOf(tokenId);
      assert.equal(nftOwner, user1, "The NFT owner should be user1");

      const cardDetails = await creditCardNFT.getCreditCardDetails(tokenId);
      assert.equal(cardDetails.balance, 0, "The initial balance should be 0");
      assert.equal(cardDetails.interestRate, interestRate, "The interest rate should match the provided value");
      assert.equal(cardDetails.dueDate, dueDate, "The due date should match the provided value");
    });

    // it("should deposit tokens to the credit pool", async () => {
    //   const depositAmount = 1000;
    //   await creditCardToken.mint(user1, depositAmount, { from: owner });
    
    //   // Approve CreditCardNFT to spend user1's tokens
    //   await creditCardToken.approve(creditCardNFT.address, depositAmount, { from: user1 });
    
    //   await creditCardNFT.depositTokensToCreditPool(depositAmount, { from: user1 });
    
    //   const creditPoolBalance = await creditPool.totalFunds();
    //   assert.equal(creditPoolBalance.toString(), depositAmount.toString(), "The credit pool should have the correct balance");
    // });     
  });
});
