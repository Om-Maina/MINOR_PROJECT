const taskModel = require('../db/model/TaskModel');
const { ConnectionStates } = require('mongoose');

exports.createTasks = async (req, res) => {
    const task = new taskModel({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.getMyTaks = async (req, res) => {
    const _id = req.params.id
    try {
        const task = await taskModel.findOne({ _id, owner: req.user._id });
        if (!task) {
            res.status(404).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send()
    }
}

// GET: /tasks?completed=true
// GET: /tasks?limit=2&skip=2
// GET: /tasks?sortBy=createdAt:desc
exports.getAllTasks = async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate('tasks').execPopulate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.status(200).send(req.user.tasks)

        //=> This is onemore way
        //const tasks = await taskModel.find({owner: req.user._id }); 
        //res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send()
    }
}   