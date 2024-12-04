export const addTask = (tasks, newTask) => [...tasks, newTask];

export const removeTask = (tasks, id) => tasks.filter((task) => task.id !== id);

export const toggleTaskCompletion = (tasks, id) =>
  tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

export const saveTasks = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

export const loadTasks = () =>
  JSON.parse(localStorage.getItem("tasks")) || [];

export const renderTasks = (tasks, container) => {
  container.innerHTML = tasks
    .map(
      (task) => `
        <li class="task ${task.completed ? "completed" : ""}">
          <label class="custom-checkbox">
            <input type="checkbox" class="task-checkbox" ${
              task.completed ? "checked" : ""
            }>
            <span class="checkmark"></span>
          </label>
          <span class="task-title">${task.title}</span>
          <button class="delete-btn" data-id="${task.id}">
            <img src="assets/delete.png" alt="Delete">
          </button>
        </li>
      `
    )
    .join("");

  container.closest(".task-box").style.display = tasks.length ? "block" : "none";

  container.querySelectorAll(".task-checkbox").forEach((checkbox, index) => {
    checkbox.addEventListener("change", () => {
      const updatedTasks = toggleTaskCompletion(tasks, tasks[index].id);
      saveTasks(updatedTasks);
      renderTasks(updatedTasks, container);
    });
  });

  container.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const updatedTasks = removeTask(tasks, +button.dataset.id);
      saveTasks(updatedTasks);
      renderTasks(updatedTasks, container);
    });
  });
};