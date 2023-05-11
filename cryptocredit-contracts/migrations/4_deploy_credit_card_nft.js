const CreditCardNFT = artifacts.require("CreditCardNFT");
const CreditPool = artifacts.require("CreditPool");
const CreditCardToken = artifacts.require("CreditCardToken");

module.exports = async function (deployer) {
  const creditPoolInstance = await CreditPool.deployed();
  const creditCardTokenInstance = await CreditCardToken.deployed();

  await deployer.deploy(
    CreditCardNFT,
    creditPoolInstance.address,
    creditCardTokenInstance.address
  );
};
