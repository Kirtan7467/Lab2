import { useNavigate } from "react-router-dom";
import API from "../Api";
import "./TodoItem.css"
import { MdEdit, MdDelete } from "react-icons/md";

type TodoData = {
  _id: unknown;
  title: string;
  description: string;
};
type TodoItemProps = {
  tododata: TodoData;
  refresh:()=> void;
};

const TodoItem = ({ tododata, refresh }: TodoItemProps) => {
    const navigate = useNavigate();

    const del = async () => {
    await API.delete(`/TodoData/${tododata._id}`);
    refresh();
    };
    const handleEdit = () => {
    
    navigate('/add', { state: {note:tododata} });
  };
  
  return (
    <div className="todo-item-card">
        <div className="block">
        <input type="checkbox" />

        </div>
        <div className="todo-content">
      <h3>{tododata.title}</h3>
      <p>{tododata.description}</p>
      </div>
      <div className="todo-actions">
      <button onClick={handleEdit}><MdEdit size={20} /></button>
      <button onClick={del}><MdDelete size={20}/></button>
      </div>
    </div>
  );
};

export default TodoItem;