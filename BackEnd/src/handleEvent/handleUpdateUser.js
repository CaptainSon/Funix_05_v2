const User = require('../modles/user');
require('../db/mongoose');

const HandleUpdateUser = async function(data) {
    let user = await User.findOne({address: `${data.returnValues.account}`})

    user.fullName = data.returnValues.fullName_new
    user.email = data.returnValues.email_new
    await user.save();
}

module.exports = HandleUpdateUser;