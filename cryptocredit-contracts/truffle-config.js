const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = 'universe vehicle media will bulb neck fault elevator jaguar rose awake dynamic';

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, `https://polygon-mumbai.infura.io/v3/8042ccc86b044e009a16b95ad7d54ac8`),
      network_id: 80001,
      gas: 18000000,
      gasPrice: 18000000, // 20 gwei
      skipDryRun: false,
      deploymentPollingInterval: 1500000, // Increase the deployment timeout
    },
    optimism: {
      provider: () => new HDWalletProvider(mnemonic, `https://optimism-goerli.infura.io/v3/8042ccc86b044e009a16b95ad7d54ac8`),
      network_id: 420,
      gas: 18000000,
      gasPrice: 18000000, // 20 gwei
      skipDryRun: false,
      deploymentPollingInterval: 1500000, // Increase the deployment timeout
    },
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/8042ccc86b044e009a16b95ad7d54ac8`),
      network_id: 11155111,
      gas: 18000000,
      gasPrice: 18000000, // 20 gwei
      skipDryRun: false,
      deploymentPollingInterval: 1500000, // Increase the deployment timeout
    }
  },

  compilers: {
    solc: {
      version: "0.8.13",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "istanbul"
      }
    }
  },

  db: {
    enabled: false
  }
};
