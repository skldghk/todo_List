"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const loadTasksFromLocalStorage = (user) => {
  if (typeof window !== 'undefined' && user) {
    const savedTasks = localStorage.getItem(`tasks_${user.email}`);
    return savedTasks ? JSON.parse(savedTasks) : [];
  }
  return [];
};

const saveTasksToLocalStorage = (user, tasks) => {
  if (typeof window !== 'undefined' && user) {
    localStorage.setItem(`tasks_${user.email}`, JSON.stringify(tasks));
  }
};

export default function TodoPage() {
  const { user } = useAuth();
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      const loadedTasks = loadTasksFromLocalStorage(user);
      setTasks(loadedTasks);
    }
  }, [user]);

  useEffect(() => {
    if (user && tasks.length > 0) {
      saveTasksToLocalStorage(user, tasks);
    }
  }, [tasks, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      const newTask = { text: task, completed: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTask('');
      saveTasksToLocalStorage(user, updatedTasks);
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(user, updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(user, updatedTasks);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>To-Do List</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add
        </button>
      </form>
      <ul style={styles.list}>
        {tasks.map((task, index) => (
          <li key={index} style={styles.listItem}>
            <span
              onClick={() => toggleComplete(index)}
              style={{
                ...styles.taskText,
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {task.text}
            </span>
            <button
              onClick={() => handleDelete(index)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1rem',
    fontSize: '2rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  input: {
    flexGrow: 1,
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    marginRight: '0.5rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    flexShrink: 0,
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  taskText: {
    fontSize: '1rem',
    flexGrow: 1,
    textAlign: 'left',
  },
  deleteButton: {
    padding: '0.25rem 0.5rem',
    fontSize: '0.875rem',
    color: 'white',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginLeft: 'auto',
    maxWidth: '80px',
  },
};
