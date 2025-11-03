import { memo } from "react";

function SearchBar({ searchTerm, onSearch }) {
  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "70%",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
    </div>
  );
}

export default memo(SearchBar);
