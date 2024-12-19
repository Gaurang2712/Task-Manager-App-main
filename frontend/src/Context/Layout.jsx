import React from "react";
import Action from "./Action"; // Ensure this is correctly imported

const Layout = ({
  level,
  getTasksByPriority,
  selectedTask,
  setSelectedTask,
  handleEditTask,
  handleChangePriority,
  handleDeleteTask,
}) => {
  // Determine the background color based on the priority level
  const getBackgroundColor = (level) => {
    switch (level) {
      case "High":
        return "bg-red-200 border-red-300"; // Light Red
      case "Medium":
        return "bg-yellow-200 border-yellow-300"; // Light Yellow
      case "Low":
        return "bg-green-200 border-green-300"; // Light Green
      default:
        return "bg-gray-100 border-gray-200"; // Default Light Gray
    }
  };

  // Get tasks for the current priority level
  const tasks = getTasksByPriority(level) || [];

  return (
    <div className={`p-4 rounded border ${getBackgroundColor(level)}`}>
      <h2 className="text-lg font-primary font-semibold mb-4">
        {level} Priority
      </h2>

      {tasks.map((task, index) => (
        <div key={index} className="bg-white p-2 rounded mb-2">
          {/* Task Text */}
          <p
            className="text-base cursor-pointer font-secondary"
            onClick={() => setSelectedTask(task)}
          >
            - {task.text}
          </p>

          {/* Render Actions if Task is Selected */}
          {selectedTask === task && (
            <Action
              priority={level}
              selectedTask={selectedTask}
              handleEditTask={handleEditTask}
              handleChangePriority={handleChangePriority}
              handleDeleteTask={handleDeleteTask}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Layout;
