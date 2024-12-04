import {
    addTask,
    removeTask,
    toggleTaskCompletion,
    saveTasks,
    loadTasks,
    renderTasks,
  } from "./taskManager.js";
  
  const taskInput = document.getElementById("task-input");
  const taskForm = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  
  let tasks = loadTasks(); 
  
  renderTasks(tasks, taskList);
 
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const newTask = {
      id: Date.now(),
      title: taskInput.value.trim(),
      completed: false,
    };
  
    if (newTask.title !== "") {
      tasks = addTask(tasks, newTask);
      saveTasks(tasks); 
      renderTasks(tasks, taskList); 
      taskInput.value = ""; 
    }
  });