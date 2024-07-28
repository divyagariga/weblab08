import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  }

  function handleDelete(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function handleEdit(index) {
    setEditingIndex(index);
    setEditingValue(todos[index]);
  }

  function handleSave(index) {
    if (editingValue.trim() !== '') {
      const newTodos = [...todos];
      newTodos[index] = editingValue;
      setTodos(newTodos);
      setEditingIndex(null);
      setEditingValue('');
    }
  }

  function handleEditingChange(e) {
    setEditingValue(e.target.value);
  }

  const appStyles = {
    backgroundColor: '#2E2E2E', 
    color: 'white',
    minHeight: '100vh',
    padding: '20px'
  };

  const buttonStyles = {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    margin: '5px',
    cursor: 'pointer'
  };

  const inputStyles = {
    padding: '10px',
    margin: '5px',
    border: '1px solid #555',
    borderRadius: '4px',
    backgroundColor: '#444', 
    color: 'white' 
  };

  return (
    <div style={appStyles}>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={inputValue}
          onChange={handleChange}
          style={inputStyles}
        />
        <button type='submit' style={buttonStyles}>Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <span>
                <input
                  type="text"
                  value={editingValue}
                  onChange={handleEditingChange}
                  style={inputStyles}
                />
                <button onClick={() => handleSave(index)} style={buttonStyles}>Save</button>
              </span>
            ) : (
              <span>
                {todo}
                <button onClick={() => handleEdit(index)} style={buttonStyles}>Edit</button>
                <button onClick={() => handleDelete(index)} style={buttonStyles}>Delete</button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
