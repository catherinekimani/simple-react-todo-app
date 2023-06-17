import React, { useState, useEffect } from "react";
import "./TodoApp.css";
const TodoApp = () => {
  // declare state variables with their corresponding funcs
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  // load tasks
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  // save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  // adding new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      const task = {
        id: Date.now(),
        title: newTask,
        description: "",
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };
  // removing a task
  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  // toggle
  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  // update
  const updateTaskDescription = (taskId, description) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          description: description
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          placeholder="Enter a task"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <div className="task-info">
              <div className="task-title">{task.title}</div>
              <div className="task-description">
                <input
                  type="text"
                  value={task.description}
                  placeholder="Task description"
                  onChange={(e) =>
                    updateTaskDescription(task.id, e.target.value)
                  }
                />
              </div>
              <div className="task-status">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <label>Completed</label>
              </div>
              <button onClick={() => removeTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TodoApp;
