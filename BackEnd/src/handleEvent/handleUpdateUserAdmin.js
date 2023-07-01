const User = require('../modles/user');
require('../db/mongoose');

const HandleUpdateUserAdmin = async function(data) {
    let user = await User.findOne({address: `${data.returnValues.account}`})

    user.fullName = data.returnValues.fullName_new
    user.email = data.returnValues.email_new
    user.numberOfJoinedSession = data.returnValues.numJoinSessinon_new
    const deviation_get = await data.returnValues.deviationNew
    const decimals = deviation_get / (10**18)
    user.deviation = decimals
    await user.save();
}

module.exports = HandleUpdateUserAdmin;