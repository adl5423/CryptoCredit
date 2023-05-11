const CreditCardToken = artifacts.require("CreditCardToken");

module.exports = function (deployer) {
  deployer.deploy(CreditCardToken);
};
