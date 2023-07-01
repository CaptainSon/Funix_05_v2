const Session = require('../modles/session');
require('../db/mongoose');

const HandleStateChange = async function(data) {
    let session = await Session.findOne({addressSession:`${data.address}`})
    if(data.returnValues.State == 'Votting') {
        if(session.state == 0) {
            session.state = 1;
            await session.save();
        }
    }
    if(data.returnValues.State == 'Closing') {
        if(session.state == 1) {
            session.state = 2;
            await session.save();
        }
    }
    if(data.returnValues.State == 'CLOSED') {
        if(session.state == 2) {
            session.state = 3;
            await session.save();
        }
    }
}

module.exports = HandleStateChange;