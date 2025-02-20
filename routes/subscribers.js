const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')
const subscriber = require('../models/subscriber')

// Getting all
router.get('/', async (req,res) => {
    try {
        const subscribers = await Subscriber.find()
    }catch {
        res.status(500).json({ message: err.message})
    }
})

// Getting one
router.get('/:id', getSubscriber, (req,res) => {
    res.json(res.subscriber)
})

// creating one
router.post('/', async (req,res) => {
    // res.send('Hello World')
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriber.save()
        res.sendStatus(201).json(newSubscriber)
    }catch {
        res.status(400).json({message: err.message})
    }
})

// updating one
router.patch('/:id', getSubscriber, async (req,res) => {
    if (req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if( req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

// deleting one
router.delete('/:id', getSubscriber, async (req,res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'Deleted Subscriber'})
    }catch (err){
        res.status(500).json({message: err.Subscriber})
    }
})

async function getSubscriber(req,res,next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({ message: 'Cannot find susbscriber'})
        }
    }catch (err) {
        return res.status(500).json({ message: err.message})
    }
    res.subscriber = subscriber
    next()
}


module.exports = router