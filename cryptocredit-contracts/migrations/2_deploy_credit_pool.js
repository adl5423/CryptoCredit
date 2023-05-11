const CreditPool = artifacts.require("CreditPool");

// Establece la dirección del token estable (stablecoin) que se utilizará en el pool de crédito
const stablecoinAddress = "0x0000000000000000000000000000000000001010"; // Reemplaza esto con la dirección del token estable
const initialInterestRate = 500; // Por ejemplo, 5.00% de interés
const initialRepaymentPeriod = 30;

module.exports = function (deployer) {
  deployer.deploy(CreditPool, stablecoinAddress, initialInterestRate, initialRepaymentPeriod);
};
