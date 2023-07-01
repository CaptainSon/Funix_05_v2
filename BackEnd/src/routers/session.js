const express = require('express')
const Session = require('../modles/session')
const router = new express.Router()

router.get('/sessions', async (req, res) => {
    try {
        const sessions = await Session.find({});
        res.status(200).send(sessions);
    } catch (error) {
        res.status(505);
        console.log(error);
    }
})

router.get('/sessions/votting', async (req, res) => {
    try {
        const sessions = await Session.find({state:{$lt:2}});
        res.status(200).send(sessions);
    } catch (error) {
        res.status(505);
        console.log(error);
    }
})  

module.exports = router;