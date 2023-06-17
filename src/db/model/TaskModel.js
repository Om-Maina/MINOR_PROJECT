const mongoose = require('mongoose');
const taskSchema = require('../schema/TaskSchema');

const taskModel = mongoose.model('task', taskSchema)
module.exports = taskModel;