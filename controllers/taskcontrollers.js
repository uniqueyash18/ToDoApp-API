const Todo = require('../models/todo');

async function getAllTasks(req, res) {
  try {
    const userId = req.params.userId;
    const tasks = await Todo.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching tasks' });
  }
}


async function createTask(req, res) {
  try {
    const { task, userId } = req.body;
    const newTask = new Todo({
      task,
      completed: false,
      userId,
    });
    await newTask.save();
    const tasks = await Todo.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the task' });
  }
}

async function getTasks(req, res) {
  try {
    const userId = req.params.userId;
    const tasks = await Todo.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching tasks' });
  }
}

async function updateTaskStatus(req, res) {
  try {
    const taskId = req.params.taskId;
    const task = await Todo.findById(taskId);
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the task' });
  }
}

async function deleteTask(req, res) {
  try {
    const taskId = req.params.taskId;
    await Todo.findByIdAndRemove(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the task' });
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
  getAllTasks
};
