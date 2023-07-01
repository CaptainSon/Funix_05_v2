const Session = require('../modles/session');
require('../db/mongoose');

const HandleCaclculatePropose = async function(data) {
    const sessionFind = await Session.findOne({addressSession:`${data.address}`})
    try {
        sessionFind.proposePrice = data.returnValues.numberPropose
        await sessionFind.save()
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = HandleCaclculatePropose;