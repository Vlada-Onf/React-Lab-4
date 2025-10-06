import { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import "./../styles/Todo.css";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      todo: text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const handleUpdateTodo = (id, newText) => {
  setTodos((prev) =>
    prev.map((todo) => (todo.id === id ? { ...todo, todo: newText } : todo))
  );
};

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem
  key={todo.id}
  task={todo}
  onDelete={handleDeleteTodo}
  onToggle={handleToggleTodo}
  onUpdate={handleUpdateTodo}
/>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
