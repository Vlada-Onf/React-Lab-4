graph TD
    App --> TodoList
    TodoList --> AddTodoForm
    TodoList --> TodoItem
    AddTodoForm -->|props: onAddTodo| TodoList
    TodoItem -->|props: task, onDelete, onToggle| TodoList

![Component Diagram](public/Diagram.png)
