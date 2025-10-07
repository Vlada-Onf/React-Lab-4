import { useState, useEffect } from "react";

const API_URL = "https://dummyjson.com/todos";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(5);
  const [totalTodos, setTotalTodos] = useState(0);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const skip = (currentPage - 1) * limitPerPage;
        const res = await fetch(`${API_URL}?limit=${limitPerPage}&skip=${skip}`);
        const data = await res.json();
        setTodos(data.todos);
        setAllTodos(data.todos);
        setTotalTodos(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [currentPage, limitPerPage]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setTodos(allTodos);
    } else {
      const filtered = allTodos.filter((todo) =>
        todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setTodos(filtered);
    }
  }, [searchTerm, allTodos]);

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
      setAllTodos((prev) => [...prev, newTodo]);
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
      setAllTodos((prev) => prev.filter((todo) => todo.id !== id));
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
        prev.map((t) => (t.id === id ? updated : t))
      );
      setAllTodos((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const editTodoTitle = async (id, newTitle) => {
    setIsLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: newTitle }),
      });
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, todo: newTitle } : t))
      );
      setAllTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, todo: newTitle } : t))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const goToNextPage = () => {
    if (currentPage * limitPerPage < totalTodos) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const setLimit = (limit) => {
    setLimitPerPage(limit);
    setCurrentPage(1);
  };

  return {
    todos,
    isLoading,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodoTitle,
    searchTerm,
    setSearchTerm,
    currentPage,
    limitPerPage,
    totalTodos,
    goToNextPage,
    goToPrevPage,
    setLimit,
  };
}
