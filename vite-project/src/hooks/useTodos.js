import { useState, useEffect, useCallback, useMemo } from "react";

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

  const filteredTodos = useMemo(() => {
    if (searchTerm.trim() === "") {
      return allTodos;
    }
    return allTodos.filter((todo) =>
      todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allTodos]);

  const addTodo = useCallback(async (text) => {
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
  }, []);

  const deleteTodo = useCallback(async (id) => {
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
  }, []);

  const toggleTodo = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const todo = allTodos.find((t) => t.id === id);
      const updated = { ...todo, completed: !todo.completed };
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const updateFn = (prev) =>
        prev.map((t) => (t.id === id ? updated : t));
      setTodos(updateFn);
      setAllTodos(updateFn);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [allTodos]);

  const editTodoTitle = useCallback(async (id, newTitle) => {
    setIsLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: newTitle }),
      });
      const updateFn = (prev) =>
        prev.map((t) => (t.id === id ? { ...t, todo: newTitle } : t));
      setTodos(updateFn);
      setAllTodos(updateFn);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => {
      if (prev * limitPerPage < totalTodos) {
        return prev + 1;
      }
      return prev;
    });
  }, [limitPerPage, totalTodos]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const setLimit = useCallback((limit) => {
    setLimitPerPage(limit);
    setCurrentPage(1);
  }, []);

  return {
    todos: filteredTodos,
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
