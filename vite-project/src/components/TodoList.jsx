import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { useTodos } from "../hooks/useTodos";
import "./../styles/Todo.css";

function TodoList() {
  const {
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
    totalTodos,
    limitPerPage,
    goToNextPage,
    goToPrevPage,
  } = useTodos();

  return (
    <div className="container">
      <h1>To-Do List</h1>

      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <AddTodoForm onAddTodo={addTodo} />

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            task={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            onEdit={editTodoTitle}
          />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalTodos={totalTodos}
        limitPerPage={limitPerPage}
        onNext={goToNextPage}
        onPrev={goToPrevPage}
      />
    </div>
  );
}

export default TodoList;
