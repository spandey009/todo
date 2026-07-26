import { useState } from "react";

export default function TodoItem({
    todo,
    deleteTodo,
    editTodo,
    toggleComplete
}) {

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);


    const saveEdit = () => {

        if (editText.trim() === "") {
            return;
        }

        editTodo(todo.id, editText);

        setIsEditing(false);
    };


    const cancelEdit = () => {
        setEditText(todo.text);
        setIsEditing(false);
    };


    const getDueStatus = () => {

        if (!todo.dueDate) {
            return null;
        }

        if (todo.completed) {
            return "completed-date";
        }

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const due = new Date(
            `${todo.dueDate}T00:00:00`
        );

        if (due.getTime() === today.getTime()) {
            return "today";
        }

        if (due < today) {
            return "overdue";
        }

        return "upcoming";
    };


    const dueStatus = getDueStatus();


    const getDueLabel = () => {

        if (dueStatus === "overdue") {
            return "Overdue";
        }

        if (dueStatus === "today") {
            return "Due Today";
        }

        if (dueStatus === "upcoming") {
            return "Upcoming";
        }

        if (dueStatus === "completed-date") {
            return "Completed";
        }

        return "";
    };


    const getCategoryIcon = () => {

        const icons = {
            Coding: "💻",
            Study: "📚",
            Work: "💼",
            Personal: "👤",
            Health: "🏃"
        };

        return icons[todo.category] || "📌";
    };


    return (
        <li
            className={
                todo.completed
                    ? "todo-item completed"
                    : "todo-item"
            }
        >

            <div className="todo-content">

                <button
                    className={
                        todo.completed
                            ? "check-btn checked"
                            : "check-btn"
                    }
                    onClick={() =>
                        toggleComplete(todo.id)
                    }
                    title={
                        todo.completed
                            ? "Mark as pending"
                            : "Mark as completed"
                    }
                    aria-label={
                        todo.completed
                            ? "Mark task as pending"
                            : "Mark task as completed"
                    }
                >
                    {todo.completed ? "✓" : ""}
                </button>


                <div className="todo-info">

                    {isEditing ? (

                        <input
                            className="edit-input"
                            type="text"
                            value={editText}
                            onChange={(event) =>
                                setEditText(event.target.value)
                            }
                            onKeyDown={(event) => {

                                if (event.key === "Enter") {
                                    saveEdit();
                                }

                                if (event.key === "Escape") {
                                    cancelEdit();
                                }

                            }}
                            autoFocus
                        />

                    ) : (

                        <span className="todo-text">
                            {todo.text}
                        </span>

                    )}


                    <div className="todo-details">

                        {todo.category && (

                            <span
                                className={`category ${todo.category.toLowerCase()}`}
                            >
                                {getCategoryIcon()} {todo.category}
                            </span>

                        )}


                        <span
                            className={`priority ${(todo.priority || "Medium").toLowerCase()}`}
                        >
                            {todo.priority || "Medium"}
                        </span>


                        {todo.dueDate && (

                            <span className="due-date">
                                📅 {todo.dueDate}
                            </span>

                        )}


                        {dueStatus && (

                            <span
                                className={`due-status ${dueStatus}`}
                            >
                                {getDueLabel()}
                            </span>

                        )}

                    </div>

                </div>

            </div>


            <div className="todo-actions">

                {isEditing ? (
                    <>
                        <button
                            className="save-btn"
                            onClick={saveEdit}
                        >
                            ✓ Save
                        </button>

                        <button
                            className="cancel-btn"
                            onClick={cancelEdit}
                        >
                            ✕ Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="edit-btn"
                            onClick={() =>
                                setIsEditing(true)
                            }
                        >
                            ✏️ Edit
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() =>
                                deleteTodo(todo.id)
                            }
                        >
                            🗑️ Delete
                        </button>
                    </>
                )}

            </div>

        </li>
    );
}