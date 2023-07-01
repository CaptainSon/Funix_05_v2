const Session = require('../modles/session');
require('../db/mongoose');

const HandleCreateSession = async function(data) {
    const sessionFind = await Session.findOne({addressSession:`${data.address}`})

    if (sessionFind == null) {
        const session = new Session({
            addressSession: data.returnValues.sessionAddress,
            productName: data.returnValues.name,
            productDescription: data.returnValues.description,
            productImage: data.returnValues.image[0],
            proposePrice: 0,
            finalPrice: 0,
            state: 0,
        })
    
        await session.save();
    }
}

module.exports = HandleCreateSession;