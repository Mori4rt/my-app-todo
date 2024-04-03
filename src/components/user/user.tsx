import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './user.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos?userId=1');
      setTodos(response.data.slice(0, 20));
    };
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'All') {
      return true;
    } else if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'uncompleted') {
      return !todo.completed;
    }
  });

  return (
    <div>
      <div className="filter-buttons">
        <button className="active" onClick={() => setFilter('All')}>Все задачи</button>
        <button className="active" onClick={() => setFilter('completed')}>Выполненные</button>
        <button className="active" onClick={() => setFilter('uncompleted')}>Невыполненные</button>
      </div>
      {filteredTodos.length > 0 ? (
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <li className="todo-item" key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'grey' : 'black' }}>
              {todo.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>Не найдено задач.</p>
      )}
    </div>
  );
};

export default TodoList;
