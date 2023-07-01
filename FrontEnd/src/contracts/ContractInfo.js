const MainContractABI = require('./MainContractABI');
const SessioncontractABI = require('./SessionContractABI')

const Main_ABI = Object.values(MainContractABI);
const Session_ABI = Object.values(SessioncontractABI)
const mainContract = {
    address: '0x590cB78bAda57444eda41B6BB341Fbf7bd188793',
    abi: Main_ABI[0],
    sessionABI:  Session_ABI[0],
    imgIPFS:  'http://localhost:8080/ipfs/QmNQV7m6pbx8zLpvvrfGgMW9JmsbAxiGbVXw9bYsh5PsFS',
    addressOfAdmin: '0x7821bAa829968c910C631281A0A021C3E2E54D1A',
}

module.exports = mainContract