import React, { useState, useEffect } from 'react';
import './TodoList.css';
import Header from './Header';
import Footer from './Footer';

function AddTodo({ addTask, editIndex, setEditIndex, todos }) {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editIndex !== null) {
      setTask(todos[editIndex].text);
      setDate(todos[editIndex].date);
      setTime(todos[editIndex].time);
      setDescription(todos[editIndex].description);
    }
  }, [editIndex,todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task || !date || !time || !description) return;
    addTask({ text: task, date, time, description }, editIndex);
    alert('Task added successfully!');
    setTask('');
    setDate('');
    setTime('');
    setDescription('');
    setEditIndex(null);
  };

  return (

    <form onSubmit={handleSubmit} className='formtodo'>
      <input
        type="text"
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addTask = (task, editIndex) => {
    if (editIndex !== null) {
      setTodos(prevTodos => prevTodos.map((todo, index) => index === editIndex ? { id: todo.id, ...task } : todo));
    } else {
      setTodos(prevTodos => [...prevTodos, { id: Date.now(), ...task }]);
    }
  };

  const editTask = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    setEditIndex(index);
  };

  const deleteTask = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    alert('task is deleted');
  };
  
  const completeTask = (id) => {
    const newTodos = todos.map(todo => todo.id === id ? { ...todo, isCompleted: true } : todo);
    setTodos(newTodos);
    alert('task is marked as completed');
  };

  const today = new Date();
  const twoDaysLater = new Date();
  twoDaysLater.setDate(today.getDate() + 2);
  const tenDaysLater = new Date();
  tenDaysLater.setDate(today.getDate() + 10);

  const todaysTasks = todos.filter(
    (todo) => new Date(todo.date).toDateString() === today.toDateString() && !todo.isCompleted
  );
  const upcomingTasks = todos.filter(
    (todo) => new Date(todo.date) > today && new Date(todo.date) <= twoDaysLater && !todo.isCompleted
  );
  const longTermGoals = todos.filter((todo) => new Date(todo.date) > twoDaysLater && !todo.isCompleted);
  const completedTasks = todos.filter((todo) => todo.isCompleted);

  useEffect(() => {
    const interval = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => {
          if (todo.isCompleted) {
            const completionDate = new Date(todo.date);
            completionDate.setDate(completionDate.getDate() + 1);
            return new Date() < completionDate;
          }
          return true;
        })
      );
    }, 60 * 1000); // Run every day
    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className='tasklist'>
      <AddTodo addTask={addTask} editIndex={editIndex} setEditIndex={setEditIndex} todos={todos} />
      <h2>Today's Tasks</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Time</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todaysTasks.map((todo, index) => (
            <tr key={index}>
              <td>{todo.text}</td>
              <td>{todo.date}</td>
              <td>{todo.time}</td>
              <td>{todo.description}</td>
              <td>
                {!todo.isCompleted && <button onClick={() => completeTask(todo.id)}>Complete</button>}
                {!todo.isCompleted && <button onClick={() => editTask(todo.id)}>Edit</button>}
                <button onClick={() => deleteTask(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Upcoming Tasks</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Time</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {upcomingTasks.map((todo, index) => (
            <tr key={index}>
              <td>{todo.text}</td>
              <td>{todo.date}</td>
              <td>{todo.time}</td>
              <td>{todo.description}</td>
              <td>
                {!todo.isCompleted && <button onClick={() => completeTask(todo.id)}>Complete</button>}
                {!todo.isCompleted && <button onClick={() => editTask(todo.id)}>Edit</button>}
                <button onClick={() => deleteTask(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Long Term Goals</h2>
        <table className='table'>
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Time</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {longTermGoals.map((todo, index) => (
            <tr key={index}>
              <td>{todo.text}</td>
              <td>{todo.date}</td>
              <td>{todo.time}</td>
              <td>{todo.description}</td>
              <td>
                {!todo.isCompleted && <button onClick={() => completeTask(todo.id)}>Complete</button>}
                {!todo.isCompleted && <button onClick={() => editTask(todo.id)}>Edit</button>}
                <button onClick={() => deleteTask(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Completed Tasks</h2>
        <table className='table'>
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Time</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.map((todo, index) => (
            <tr key={index}>
              <td>{todo.text}</td>
              <td>{todo.date}</td>
              <td>{todo.time}</td>
              <td>{todo.description}</td>
              <td>
                <button onClick={() => deleteTask(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}
function main() {
  return (
    <div className="main">
      <Header/>
      <TodoList />
      <Footer/>
    </div>
  );
}
export default main;