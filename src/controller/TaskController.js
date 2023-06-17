const express = require('express')
const taskService = require('../service/TaskService')
const auth = require('../middleware/Auth');

const router = new express.Router();

router.post('/tasks', auth, taskService.createTasks);
router.get('/tasks', auth, taskService.getAllTasks);
router.get('/tasks/:id', auth, taskService.getMyTaks);

module.exports = router;