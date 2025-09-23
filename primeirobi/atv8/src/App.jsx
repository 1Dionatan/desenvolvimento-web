import React, { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  
  const [inputValue, setInputValue] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [taskTime, setTaskTime] = useState('')

  const addTodo = (e) => {
    e.preventDefault()
    if (inputValue.trim() === '') return
    
    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      date: taskDate,
      time: taskTime,
      completed: false
    }
    
    setTodos([...todos, newTodo])
    setInputValue('')
    setTaskDate('')
    setTaskTime('')
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const editTodo = (id) => {
    const todo = todos.find(todo => todo.id === id)
    const newText = prompt('Editar tarefa:', todo.text)
    
    if (newText !== null && newText.trim() !== '') {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      ))
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>

      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite uma nova tarefa"
          className="task-input"
        />
        <button onClick={addTodo} className="add-btn">
          Adicionar
        </button>
      </div>
      
      <div className="options-container">
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
          className="task-date-input"
        />
        <input
          type="text"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
          placeholder="Horário (opcional)"
          className="task-time-input"
        />
      </div>

      <ul className="task-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <div className="task-info">
              <span className="task-text">{todo.text}</span>
              {todo.date && (
                <span className="task-date">
                  Data: {formatDate(todo.date)}
                </span>
              )}
              {todo.time && (
                <span className="task-time">
                  Horário: {todo.time}
                </span>
              )}
            </div>
            <div className="task-actions">
              <button 
                className="complete-btn"
                onClick={() => toggleComplete(todo.id)}
              >
                ✔️
              </button>
              <button 
                className="edit-btn"
                onClick={() => editTodo(todo.id)}
              >
                ✏️
              </button>
              <button 
                className="remove-btn"
                onClick={() => removeTodo(todo.id)}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
