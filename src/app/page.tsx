"use client";

import { useState } from "react";

// Define the type for a task
type Task = {
  id: number;
  text: string;
  category: string;
  completed: boolean;
};

export default function TaskTidy() {


  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ text: "", category: "Work" });
  const [filter, setFilter] = useState("All");

  // Add a new task
  const addTask = () => {
    if (newTask.text.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask.text,
          category: newTask.category,
          completed: false,
        },
      ]);
      setNewTask({ text: "", category: "Work" }); // Reset input fields
    }
  };

  // Toggle task completion
  const toggleCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return task.category === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 md:px-16 py-8">
      {/* Header */}
      <h1 className="text-xl  md:text-4xl lg:text-4xl font-bold text-blue-600 mb-6 text-center">
        TaskTidy: Manage Your Tasks Efficiently
      </h1>

      {/* Filter Buttons */}
      <div className="mb-4 flex flex-col md:flex-row lg:flex-row gap-4">
        <div className="mb-2 flex gap-4 ">
        <button
          onClick={() => setFilter("All")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
        >
          All
        </button>
        
        <button
          onClick={() => setFilter("Completed")}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mr-2"
        >
          Completed
        </button>
        </div>
        <div className="mb-2 flex gap-4">
        <button
          onClick={() => setFilter("Pending")}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
        >
          Pending
        </button>
        
        <button
          onClick={() => setFilter("Work")}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mr-2"
        >
          Work
        </button>
        </div>
        <div>
        <button
          onClick={() => setFilter("Personal")}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 mr-2"
        >
          Personal
        </button>
        
        <button
          onClick={() => setFilter("Urgent")}
          className="px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-600"
        >
          Urgent
        </button>
        </div>
      </div>
      



      {/* Add Task Form */}
      <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md mb-8">
  <h2 className="text-xl font-bold text-gray-700 mb-4">Add a New Task</h2>

  {/* Task Description */}
  <input
    type="text"
    placeholder="Task description"
    value={newTask.text}
    onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
    className="w-full px-4 py-2 text-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mb-4"
  />

  {/* Category Select */}
  <label
    htmlFor="category"
    className="block text-gray-700 mb-2 font-semibold"
  >
    Category
  </label>
  <select
    id="category"
    value={newTask.category}
    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
    className="w-full px-4 py-2 text-gray-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mb-4"
  >
    <option value="Work">Work</option>
    <option value="Personal">Personal</option>

    <option value="Urgent">Urgent</option>
  </select>

  {/* Add Task Button */}
  <button
    onClick={addTask}
    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
  >
    Add Task
  </button>
</div>


      {/* Task List */}
      <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Task List</h2>
        {filteredTasks.length > 0 ? (
          <ul className="space-y-4">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className={`text-gray-400 flex justify-between items-center p-4 rounded-md ${
                  task.completed ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                <div>
                  <p
                    className={`font-bold ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.text}
                  </p>
                  <p className="text-sm text-gray-500">{task.category}</p>
                </div>
                <div className="flex  flex-col md:flex-row lg:flex-row space-x-2 ml-16 justify-end items-end">
                  <button
                    onClick={() => toggleCompletion(task.id)}
                    className="font-bold text-[10px]  text-white bg-green-500 px-2 py-1 rounded-md hover:bg-green-600"
                  >
                    {task.completed ? "Mark Pending" : "Mark Completed"}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="font-bold text-[10px]  text-white bg-red-500 px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No tasks to display.</p>
        )}
      </div>
      <h4 className="text-gray-300 text-center">Author: Azmat Ali</h4>
    </div>
  );
}
