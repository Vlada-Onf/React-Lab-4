import { useState } from "react";

function TodoItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.todo);

  const handleSave = () => {
    if (editedText.trim() === "") return;
    onEdit(task.id, editedText);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            marginLeft: "10px",
            flexGrow: 1,
            padding: "6px",
            fontSize: "16px",
          }}
        />
      ) : (
        <span
          className={task.completed ? "completed" : ""}
          style={{
            marginLeft: "10px",
            flexGrow: 1,
            fontSize: "16px",
            color: task.completed ? "gray" : "#2c3e50",
            wordBreak: "break-word",
          }}
        >
          {task.todo}
        </span>
      )}

      {isEditing ? (
        <button onClick={handleSave} style={{ marginLeft: "10px" }}>
          Save
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)} style={{ marginLeft: "10px" }}>
          Edit
        </button>
      )}

      <button onClick={() => onDelete(task.id)} className="delete-btn" style={{ marginLeft: "10px" }}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
