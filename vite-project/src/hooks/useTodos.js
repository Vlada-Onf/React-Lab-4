import { useState, useEffect } from "react";

const API_URL = "https://dummyjson.com/todos";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTodo = async (text) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: text,
          completed: false,
          userId: 1,
        }),
      });
      const newTodo = await res.json();
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setIsLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    const updated = { ...todo, completed: !todo.completed };

    setIsLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    todos,
    isLoading,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
  };
}
