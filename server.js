const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const Task = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API Routes with MongoDB
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.put('/api/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`TaskFlow server on port ${PORT}`);
});