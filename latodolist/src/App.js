import React, { useState, useEffect } from 'react';
import './App.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('storeData')) || [];
    setTasks(storedData);
  }, []);

  const createTask = () => {
    if (taskText.trim() !== '') {
      const newTasks = [...tasks, { text: taskText, done: false }];
      setTasks(newTasks);
      localStorage.setItem('storeData', JSON.stringify(newTasks));
      setTaskText('');
    }
  };

  const startEditing = (index) => {
    setEditIndex(index);
  };

  const finishEditing = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { text: newText, done: tasks[index].done };
    setTasks(updatedTasks);
    localStorage.setItem('storeData', JSON.stringify(updatedTasks));
    setEditIndex(null);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('storeData', JSON.stringify(updatedTasks));
    setEditIndex(null);
  };

  return (
    <div className="todo-container">
      <div className="input-container">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter your task"
        />
        <button onClick={createTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.done ? 'done' : ''}>
            {editIndex === index ? (
              <input
                type="text"
                value={task.text}
                onChange={(e) => {
                  const newText = e.target.value;
                  const updatedTasks = [...tasks];
                  updatedTasks[index] = { text: newText, done: tasks[index].done };
                  setTasks(updatedTasks);
                }}
                onBlur={() => finishEditing(index, task.text)}
                autoFocus
              />
            ) : (
              <span>{task.text}</span>
            )}
            <button onClick={() => (editIndex === index ? finishEditing(index, task.text) : startEditing(index))}>
              {editIndex === index ? 'Save' : 'Edit'}
            </button>
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

