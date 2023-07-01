const Web3 = require('web3');
const envfile = require('dotenv').config({path: '../../.env'});
const mainContractABI = require('./main.json');
const sessionContractABI = require('./session.json')
const fs = require('fs');
const mainContractAddress = process.env.CONTRACT_ADDRESS;
const web3 = new Web3(process.env.API_URL);
const mainContract = new web3.eth.Contract(mainContractABI, process.env.CONTRACT_ADDRESS);
const Session = require('../modles/session')

// handle event 
const HandleCreateSession = require('../handleEvent/handleCreateSession')
const HandleRegisterSuccess = require('../handleEvent/handleRegisterSuccess')
const HandleUpdateUser = require('../handleEvent/handleUpdateUser')
const HandleStateChange = require('../handleEvent/handleStateChange')
const HandleCaclculatePropose = require('../handleEvent/handleCaclculatePropose')
const HandleCloseSession = require('../handleEvent/handleCloseSession')
const HandleUpdateUserAdmin = require('../handleEvent/handleUpdateUserAdmin');


// Main Contract Event
const CreateSession = 'CreateSession'
const RegisterSuccess = 'RegisterSuccess'
const UpdateUser = 'UpdateUser'
const UpdateUserAdmin = 'UpdateUserAdmin'
// Session Contract Event
const Vote = 'Vote'
const CaclculatePropose = 'CaclculatePropose'
const StateChange = 'StateChange'
const CloseSession = 'CloseSession'

let preLastBlock = process.env.LAST_BLOCK;
let lastBlockJson = require('./lastblock.json');
const { json } = require('express');
let lastBlock = lastBlockJson.lastBlock
let arrayEvent = [];
function saveConfig() {
    let rawdata = fs.readFileSync('./lastblock.json', { encoding: 'utf8', flag: 'r' });
    let data = JSON.parse(rawdata)
    data.lastBlock = lastBlock
    fs.writeFileSync('./lastblock.json', JSON.stringify(data));
}

async function handleEvent() {
    if( arrayEvent.length == 0 ){
        return
    }
    arrayEvent.sort((a,b) => {
        return a.blockNumber < b.blockNumber
    })
    arrayEvent.forEach( async (value) => {
        if(value.event == CreateSession) {
            await HandleCreateSession(value)
        }
        if(value.event == RegisterSuccess) {
            await HandleRegisterSuccess(value)
        }
        if(value.event == UpdateUser) {
            await HandleUpdateUser(value)
        }
        if(value.event == UpdateUserAdmin) {
            await HandleUpdateUserAdmin(value)
        }
        if(value.event == StateChange) {
            await HandleStateChange(value)
        }
        if(value.event == CaclculatePropose) {
            await HandleCaclculatePropose(value)
        }
        if(value.event == CloseSession) {
            await HandleCloseSession(value)
        }
    })

    arrayEvent = []
}

async function pushArray(array) {
    array.forEach(element => {
        arrayEvent.push(element)
    });
}

async function getEvent() {
    console.log(lastBlock)

    let toBlock = await web3.eth.getBlockNumber() * 1
    if (toBlock - lastBlock > 1000) {
        toBlock = lastBlock * 1 + 1000
    }
    if(lastBlock > toBlock) {
        console.log('waiting for new block ........');
        return
    }

    // get arraySession 

    let arraySession = await Session.find({})

    console.log("1 --> lastblock : " + lastBlock + " toBlock : " + toBlock)

    mainContract.getPastEvents(CreateSession, {  fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
        if (err) {
            return
        }
        if (result.length > 0 ) {
            console.log('----------------------- CreateSession ---------------------')
            console.log(result);
            await pushArray(result)
        }
    })

    mainContract.getPastEvents(RegisterSuccess, { fromBlock:lastBlock, toBlock: toBlock}, async (err, result) => {
        if (err) {
            return
        }
        if (result.length > 0 ) {
            console.log('----------------------- RegisterSuccess ---------------------')
            console.log(result);
            await pushArray(result)
        }
    })

    mainContract.getPastEvents(UpdateUser, { fromBlock:lastBlock, toBlock: toBlock}, async (err, result) => {
        if (err) {
            return
        }
        if (result.length > 0 ) {
            console.log('----------------------- UpdateUser ---------------------')
            console.log(result);
            await pushArray(result)
        }
    })

    mainContract.getPastEvents(UpdateUserAdmin, { fromBlock:lastBlock, toBlock: toBlock}, async (err, result) => {
        if (err) {
            return
        }
        if (result.length > 0 ) {
            console.log('----------------------- UpdateUserAdmin ---------------------')
            console.log(result);
            await pushArray(result)
        }
    })

    arraySession.forEach(element => {
        const sessionContract =  new web3.eth.Contract(sessionContractABI, element.addressSession);

        sessionContract.getPastEvents(Vote, {fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
            if(err) {
                return 
            }
            if(result.length > 0) {
                console.log('----------------------- Vote ---------------------')
                console.log(result);
                await pushArray(result)
            }
        })

        sessionContract.getPastEvents(CaclculatePropose, {fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
            if(err) {
                return 
            }
            if(result.length > 0) {
                console.log('----------------------- CaclculatePropose ---------------------')
                console.log(result);
                await pushArray(result)
            }
        })

        sessionContract.getPastEvents(CloseSession, {fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
            if(err) {
                return 
            }
            if(result.length > 0) {
                console.log('----------------------- CloseSession ---------------------')
                console.log(result);
                await pushArray(result)
            }
        })

        sessionContract.getPastEvents(StateChange, {fromBlock: lastBlock, toBlock: toBlock }, async (err, result) => {
            if(err) {
                return 
            }
            if(result.length > 0) {
                console.log('----------------------- StateChange ---------------------')
                console.log(result);
                await pushArray(result)
            }
        })

    });

    // console.log("4 --> " + arrayEvent.length)
    if (arrayEvent.length > 0) {
        arrayEvent.sort((a,b) => {
            return a.blockNumber < b.blockNumber
        })
        arrayEvent.forEach((value) => {
            if (value.event == CreateSession) {
            }
        })
    }   
    
    lastBlock = toBlock + 1;
    saveConfig()
}

setInterval(async function () {
    await getEvent()
    await handleEvent()
}, 6000)
