const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskcontrollers');

router.post('/tasks', taskController.createTask);
router.post('/tasks/:userId', taskController.getAllTasks);
router.get('/tasks/:userId', taskController.getTasks);
router.put('/tasks/:taskId', taskController.updateTaskStatus);
router.delete('/tasks/:taskId', taskController.deleteTask);
router.delete('/tasks/user/:userId', taskController.deleteAllTasks);
module.exports = router;
