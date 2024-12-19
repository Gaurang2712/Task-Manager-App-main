import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedText, setEditedText] = useState("");

  const API_URL = "http://localhost:5000/tasks";

  // Fetch tasks from API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Handle Add Task
  const handleTaskSubmit = () => {
    if (!textInput.trim() || !taskDate.trim()) return;

    const currentDate = new Date();
    const newTaskDate = new Date(taskDate);
    const timeDiff = newTaskDate - currentDate;
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    let priority = "Low";
    if (dayDiff <= 5) priority = "High";
    else if (dayDiff <= 15) priority = "Medium";

    const newTask = { text: textInput, priority, date: taskDate };

    axios
      .post(API_URL, newTask)
      .then((response) => {
        setTasks([...tasks, { ...newTask, id: response.data.taskId }]);
        setTextInput("");
        setTaskDate("");
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  // Handle Edit Task
  const handleSaveEditedTask = () => {
    if (!editedText.trim()) return;

    axios
      .put(`${API_URL}/${selectedTask.id}`, { text: editedText })
      .then(() => {
        setTasks(
          tasks.map((task) =>
            task.id === selectedTask.id ? { ...task, text: editedText } : task
          )
        );
        setSelectedTask(null);
        setEditedText("");
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  // Handle Delete Task
  const handleDeleteTask = (task) => {
    axios
      .delete(`${API_URL}/${task.id}`)
      .then(() => setTasks(tasks.filter((t) => t.id !== task.id)))
      .catch((error) => console.error("Error deleting task:", error));
  };

  // Get tasks by priority
  const getTasksByPriority = (priority) =>
    tasks.filter((task) => task.priority === priority);

  // Render Tasks by Priority
  const renderTasks = (priority) => (
    <div className={`task-container priority-${priority.toLowerCase()}`}>
      <h2 className="task-header">{priority} Priority</h2>
      <ul className="task-list">
        {getTasksByPriority(priority).map((task) => (
          <li
            key={task.id}
            className="task-item flex justify-between items-center"
          >
            <span
              className="task-text cursor-pointer"
              onClick={() => setSelectedTask(task)}
            >
              {selectedTask?.id === task.id ? (
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  onBlur={handleSaveEditedTask}
                  autoFocus
                  className="task-input"
                />
              ) : (
                task.text
              )}
            </span>
            <div className="task-actions">
              <button
                className="btn btn-edit"
                onClick={() => {
                  setSelectedTask(task);
                  setEditedText(task.text);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="btn btn-delete"
                onClick={() => handleDeleteTask(task)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="task-input-section flex justify-center gap-4 items-center">
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="input-task"
          placeholder="Enter task"
        />
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
          className="input-date"
        />
        <button onClick={handleTaskSubmit} className="btn btn-add">
          Add Task
        </button>
      </div>

      <div className="task-priority-section space-y-6">
        {["High", "Medium", "Low"].map((priority) => (
          <div key={priority}>{renderTasks(priority)}</div>
        ))}
      </div>
    </div>
  );
};

export default TaskDashboard;
