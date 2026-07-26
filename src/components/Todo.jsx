import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import TaskStats from "./TaskStats";
import TaskProgress from "./TaskProgress";
import TaskFilter from "./TaskFilter";

export default function Todo() {

    // Load tasks from localStorage
    const [todos, setTodos] = useState(() => {
        try {
            const savedTodos = localStorage.getItem("todos");
            return savedTodos ? JSON.parse(savedTodos) : [];
        } catch {
            return [];
        }
    });

    const [newTodo, setNewTodo] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [category, setCategory] = useState("Coding");
    const [dueDate, setDueDate] = useState("");

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [sortBy, setSortBy] = useState("newest");

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });


    // Save tasks
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);


    // Save theme
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);


    // Add task
    const addNewTask = () => {

        if (newTodo.trim() === "") {
            return;
        }

        const newTask = {
            id: Date.now(),
            text: newTodo.trim(),
            completed: false,
            priority,
            category,
            dueDate,
            createdAt: Date.now()
        };

        setTodos((previousTodos) => [
            ...previousTodos,
            newTask
        ]);

        setNewTodo("");
        setPriority("Medium");
        setCategory("Coding");
        setDueDate("");
    };


    // Delete task
    const deleteTodo = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) {
            return;
        }

        setTodos((previousTodos) =>
            previousTodos.filter((todo) => todo.id !== id)
        );
    };


    // Edit task
    const editTodo = (id, newText) => {

        if (newText.trim() === "") {
            return;
        }

        setTodos((previousTodos) =>
            previousTodos.map((todo) => {

                if (todo.id === id) {
                    return {
                        ...todo,
                        text: newText.trim()
                    };
                }

                return todo;
            })
        );
    };


    // Complete / Undo
    const toggleComplete = (id) => {

        setTodos((previousTodos) =>
            previousTodos.map((todo) => {

                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    };
                }

                return todo;
            })
        );
    };


    // Clear completed tasks
    const clearCompleted = () => {

        const hasCompleted = todos.some(
            (todo) => todo.completed
        );

        if (!hasCompleted) {
            return;
        }

        const confirmClear = window.confirm(
            "Remove all completed tasks?"
        );

        if (!confirmClear) {
            return;
        }

        setTodos((previousTodos) =>
            previousTodos.filter((todo) => !todo.completed)
        );
    };


    // Start with all tasks
    let filteredTodos = [...todos];


    // Status filter
    filteredTodos = filteredTodos.filter((todo) => {

        if (filter === "Pending") {
            return !todo.completed;
        }

        if (filter === "Completed") {
            return todo.completed;
        }

        return true;
    });


    // Search
    filteredTodos = filteredTodos.filter((todo) =>
        todo.text
            .toLowerCase()
            .includes(search.toLowerCase().trim())
    );


    // Category filter
    filteredTodos = filteredTodos.filter((todo) => {

        if (categoryFilter === "All") {
            return true;
        }

        return todo.category === categoryFilter;
    });


    // Priority order
    const priorityOrder = {
        High: 3,
        Medium: 2,
        Low: 1
    };


    // Sorting
    filteredTodos.sort((a, b) => {

        if (sortBy === "newest") {
            return (b.createdAt || b.id) - (a.createdAt || a.id);
        }

        if (sortBy === "oldest") {
            return (a.createdAt || a.id) - (b.createdAt || b.id);
        }

        if (sortBy === "dueDate") {

            if (!a.dueDate && !b.dueDate) {
                return 0;
            }

            if (!a.dueDate) {
                return 1;
            }

            if (!b.dueDate) {
                return -1;
            }

            return a.dueDate.localeCompare(b.dueDate);
        }

        if (sortBy === "highPriority") {
            return (
                (priorityOrder[b.priority] || 0) -
                (priorityOrder[a.priority] || 0)
            );
        }

        if (sortBy === "lowPriority") {
            return (
                (priorityOrder[a.priority] || 0) -
                (priorityOrder[b.priority] || 0)
            );
        }

        return 0;
    });


    return (
        <div className={darkMode ? "app dark" : "app"}>

            <main className="todo-container">

                {/* Header */}

                <header className="header">

                    <div>
                        <h1>
                            <span>✓</span> TaskFlow
                        </h1>

                        <p>
                            Organize your day, one task at a time.
                        </p>
                    </div>

                    <button
                        className="theme-btn"
                        onClick={() =>
                            setDarkMode((current) => !current)
                        }
                        title="Change theme"
                        aria-label="Change theme"
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>

                </header>


                {/* Add Task */}

                <section className="add-section">

                    <h2>Add New Task</h2>

                    <div className="add-task">

                        <input
                            className="task-input"
                            type="text"
                            placeholder="What needs to be done?"
                            value={newTodo}
                            onChange={(event) =>
                                setNewTodo(event.target.value)
                            }
                            onKeyDown={(event) => {

                                if (event.key === "Enter") {
                                    addNewTask();
                                }

                            }}
                        />


                        <select
                            value={priority}
                            onChange={(event) =>
                                setPriority(event.target.value)
                            }
                        >
                            <option value="Low">
                                Low Priority
                            </option>

                            <option value="Medium">
                                Medium Priority
                            </option>

                            <option value="High">
                                High Priority
                            </option>
                        </select>


                        <select
                            value={category}
                            onChange={(event) =>
                                setCategory(event.target.value)
                            }
                        >
                            <option value="Coding">
                                💻 Coding
                            </option>

                            <option value="Study">
                                📚 Study
                            </option>

                            <option value="Work">
                                💼 Work
                            </option>

                            <option value="Personal">
                                👤 Personal
                            </option>

                            <option value="Health">
                                🏃 Health
                            </option>
                        </select>


                        <input
                            type="date"
                            value={dueDate}
                            onChange={(event) =>
                                setDueDate(event.target.value)
                            }
                        />


                        <button
                            className="add-btn"
                            onClick={addNewTask}
                        >
                            + Add Task
                        </button>

                    </div>

                </section>


                {/* Stats */}

                <TaskStats todos={todos} />


                {/* Progress */}

                <TaskProgress todos={todos} />


                {/* Search */}

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="🔍 Search your tasks..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />

                </div>


                {/* Filters */}

                <div className="controls">

                    <TaskFilter
                        filter={filter}
                        setFilter={setFilter}
                    />


                    <div className="control-select">

                        <label htmlFor="categoryFilter">
                            Category
                        </label>

                        <select
                            id="categoryFilter"
                            value={categoryFilter}
                            onChange={(event) =>
                                setCategoryFilter(
                                    event.target.value
                                )
                            }
                        >
                            <option value="All">
                                All Categories
                            </option>

                            <option value="Coding">
                                💻 Coding
                            </option>

                            <option value="Study">
                                📚 Study
                            </option>

                            <option value="Work">
                                💼 Work
                            </option>

                            <option value="Personal">
                                👤 Personal
                            </option>

                            <option value="Health">
                                🏃 Health
                            </option>
                        </select>

                    </div>


                    <div className="control-select">

                        <label htmlFor="sort">
                            Sort By
                        </label>

                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(event) =>
                                setSortBy(event.target.value)
                            }
                        >
                            <option value="newest">
                                Newest
                            </option>

                            <option value="oldest">
                                Oldest
                            </option>

                            <option value="dueDate">
                                Due Date
                            </option>

                            <option value="highPriority">
                                High Priority
                            </option>

                            <option value="lowPriority">
                                Low Priority
                            </option>
                        </select>

                    </div>

                </div>


                {/* Task Heading */}

                <div className="task-heading">

                    <div>
                        <h2>My Tasks</h2>

                        <p>
                            {filteredTodos.length} task
                            {filteredTodos.length !== 1 ? "s" : ""} shown
                        </p>
                    </div>

                    {todos.some((todo) => todo.completed) && (

                        <button
                            className="clear-btn"
                            onClick={clearCompleted}
                        >
                            Clear Completed
                        </button>

                    )}

                </div>


                {/* Task List */}

                {filteredTodos.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            📝
                        </div>

                        <h3>No tasks found</h3>

                        <p>
                            Add a task or change your search
                            and filters.
                        </p>

                    </div>

                ) : (

                    <ul className="todo-list">

                        {filteredTodos.map((todo) => (

                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                deleteTodo={deleteTodo}
                                editTodo={editTodo}
                                toggleComplete={toggleComplete}
                            />

                        ))}

                    </ul>

                )}


                <footer className="footer">
                    <p>
                        Built with ❤️ using React
                    </p>
                </footer>

            </main>

        </div>
    );
}