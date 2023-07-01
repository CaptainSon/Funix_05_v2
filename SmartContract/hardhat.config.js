require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");

const { API_URL, PRIVATE_KEY,POLYGONSCAN_API_KEY } = process.env;

module.exports = {
    solidity: "0.8.9",
    defaultNetwork: "polygon_mumbai",
    networks: {
      hardhat: {},
      polygon_mumbai: {
        url: API_URL,
        accounts: [`0x${PRIVATE_KEY}`]
      }
    },
    etherscan: {
        apiKey: POLYGONSCAN_API_KEY,
    }
}