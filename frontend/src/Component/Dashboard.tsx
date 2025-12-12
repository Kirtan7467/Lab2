import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";
import TodoItem from "./TodoItem";
import "./Dashboard.css";

interface Todo {
  _id: string;
  title: string;
  description: string;
}

const Dashboard = ({ refreshKey, refresh }: { refreshKey: number; refresh: () => void }) => {
  const navigate = useNavigate();
  const [tododatas, setTododatas] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    API.get("/TodoData")
      .then((res) => setTododatas(res.data))
      .catch((err) => console.error(err));
  }, [refreshKey]);

  const filteredTodos = tododatas.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>TODO LIST</h1>

        <div className="controls">
          <div className="search-box">
            {/* <span className="search-icon">Search</span> */}
            <input
              type="text"
              placeholder="Search note..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="todo-list">
        {filteredTodos.length === 0 ? (
          <p className="empty-message">
            {searchTerm ? "No matching notes found." : "No notes yet. Click + to add one!"}
          </p>
        ) : (
          filteredTodos.map((item) => (
            <TodoItem key={item._id} tododata={item} refresh={refresh} />
          ))
        )}
      </main>

      <button
        className="fab-button"
        onClick={() => navigate("/add")}
        aria-label="Add new note"
      >
        +
      </button>
    </div>
  );
};

export default Dashboard;