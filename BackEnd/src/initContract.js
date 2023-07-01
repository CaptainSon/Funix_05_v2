const Contract = require('./modles/main');
require('./db/mongoose');

async function createContract()  {
    const contract = new Contract({
        address: '0x590cB78bAda57444eda41B6BB341Fbf7bd188793',
        addressAdmin:'0x7821bAa829968c910C631281A0A021C3E2E54D1A',
    })
    try {
        await contract.save();
    } catch (error) {
        console.log(error);
    }
}


createContract();