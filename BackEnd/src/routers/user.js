const express = require('express')
const User = require('../modles/user')
const router = new express.Router()



router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(505);
        console.log(error);
    }
})

router.get('/users/:address', async (req, res) => {
    try {
        const {address} =req.params;
        const user = await User.findOne({address: address });
        if (user) {
            res.status(200).send(user);
          } else {
            res.status(404).send({ error: 'User not found' });
          }
    } catch (error) {
        res.status(505);
        console.log(error);
    }
})

module.exports = router;