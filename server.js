const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const DATA_FILE = 'tasks.json';

// читання файлу
function readTasks() {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

// запис у файл
function writeTasks(tasks) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// отримати всі завдання
app.get('/tasks', (req, res) => {
    res.json(readTasks());
});

// додати завдання
app.post('/tasks', (req, res) => {
    const tasks = readTasks();
    tasks.push(req.body);
    writeTasks(tasks);
    res.json(tasks);
});

// оновити завдання
app.put('/tasks/:index', (req, res) => {
    const tasks = readTasks();
    tasks[req.params.index] = req.body;
    writeTasks(tasks);
    res.json(tasks);
});

// видалити завдання
app.delete('/tasks/:index', (req, res) => {
    const tasks = readTasks();
    tasks.splice(req.params.index, 1);
    writeTasks(tasks);
    res.json(tasks);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
