import React from "react";
import { FaEdit, FaTrashAlt, FaArrowUp } from "react-icons/fa";

const Action = ({ selectedTask, handleEditTask, handleChangePriority, handleDeleteTask }) => {
  // Safeguard against null or undefined `selectedTask`
  if (!selectedTask) return null;

  return (
    <div className="mt-2 space-x-2">
      {/* Edit Task */}
      <button
        className="btn btn-secondary"
        onClick={() => {
          const newText = prompt("Edit task:", selectedTask.text);
          if (newText && newText.trim()) {
            handleEditTask(newText.trim());
          }
        }}
      >
        <FaEdit /> {/* Edit Icon */}
      </button>

      {/* Change Priority */}
      <button
        className="btn btn-secondary"
        onClick={() => {
          const newPriority = prompt("Enter new priority:", selectedTask.priority);
          if (newPriority && newPriority.trim()) {
            handleChangePriority(newPriority.trim());
          }
        }}
      >
        <FaArrowUp /> {/* Change Priority Icon */}
      </button>

      {/* Delete Task */}
      <button
        className="btn btn-secondary"
        onClick={() => {
          const confirmed = window.confirm(
            `Are you sure you want to delete this ${selectedTask.priority} priority task?`
          );
          if (confirmed) {
            handleDeleteTask();
          }
        }}
      >
        <FaTrashAlt /> {/* Delete Icon */}
      </button>
    </div>
  );
};

export default Action;
