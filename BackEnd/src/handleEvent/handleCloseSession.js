const Session = require('../modles/session');
const User = require('../modles/user');
const Web3 = require('web3');
const mainContractABI = require('../listener/main.json');
const mainContractAddress = process.env.CONTRACT_ADDRESS;
const web3 = new Web3(process.env.API_URL);
const mainContract = new web3.eth.Contract(mainContractABI, process.env.CONTRACT_ADDRESS);

const HandleCloseSession = async function(data) {
    const sessionFind = await Session.findOne({addressSession:`${data.address}`})
    const users = await User.find({})

    try {
        sessionFind.finalPrice = data.returnValues.priceFinal
        await sessionFind.save()
    } catch (error) {
        console.log(error)
        
    }

    users.forEach(async (element) => {
        const paricipant = await mainContract.methods.participants(element.address).call();
        let deviation = await paricipant.deviation
        deviation = deviation / (10**18);
        const numberSession = await paricipant.numberOfJoinedSession
        element.deviation = deviation
        element.numberOfJoinedSession = numberSession
        await element.save()
    });
}

module.exports = HandleCloseSession;