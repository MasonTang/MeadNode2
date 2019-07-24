const express = require('express')
const Task = require('../models/task')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')

router.post('/tasks', auth, async (req, res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
//Get/Tasks?completed=true
//Get /tasks?limit=10&skip=20
//Get /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    let match = req.query.completed
    let sort = req.query.sortBy

    if(!match){
        match = ["true", "false"]
    }

    if(sort === "createdAt:desc"){
        sort = -1
    }

    try {
       
        const tasks = await Task.find({
            owner:req.user._id,
            completed: match
        })
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip))
        .sort({
            createdAt: sort 
        })
        
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({_id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({_id:req.params.id, owner:req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id})

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router