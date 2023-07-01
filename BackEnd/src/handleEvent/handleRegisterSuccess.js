const User = require('../modles/user');
require('../db/mongoose');

const HandleRegisterSuccess = async function(data) {
    const userfind = await User.findOne({address: `${data.returnValues.account}`})
    if (userfind == null) 
    {   
        const user = new User({
            address: data.returnValues.account,
            fullName: data.returnValues.fullName,
            email: data.returnValues.email,
            numberOfJoinedSession: 0,
            deviation: 0, 
        })
    
        await user.save();

    }
}

module.exports = HandleRegisterSuccess;