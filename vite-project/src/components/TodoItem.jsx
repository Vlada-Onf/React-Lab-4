import { useState } from "react";

function TodoItem({ task, onDelete, onToggle, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.todo);

  const handleSave = () => {
    if (editedText.trim() === "") return;
    onUpdate(task.id, editedText);
    setIsEditing(false);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            style={{ marginLeft: "10px", flexGrow: 1 }}
          />
          <button onClick={handleSave} style={{ marginLeft: "10px" }}>
            Save
          </button>
        </>
      ) : (
        <>
          <span
            className={task.completed ? "completed" : ""}
            style={{ marginLeft: "10px", flexGrow: 1 }}
          >
            {task.todo}
          </span>
          <button onClick={() => setIsEditing(true)} style={{ marginLeft: "10px" }}>
            Edit
          </button>
          <button onClick={() => onDelete(task.id)} className="delete-btn" style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
