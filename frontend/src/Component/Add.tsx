import { useState, useEffect } from "react";
import API from "../Api";
import { useNavigate, useLocation } from "react-router-dom";
import "./Add.css";

interface TodoData {
  _id?: string;
  title: string;
  description: string;
}

const Add = ({ refresh }: { refresh: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = (location.state as { note?: TodoData })?.note;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isEditing = !!editData;

  useEffect(() => {
    if (editData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(editData.title || "");
      setDescription(editData.description || "");
    }
  }, [editData]);

  const submit = async () => {
    if (!title.trim() && !description.trim()) return;

    try {
      if (isEditing && editData?._id) {
        await API.put(`/TodoData/${editData._id}`, { title, description });
      } else {
        await API.post("/Tododata", { title, description });
      }

      setTitle("");
      setDescription("");
      refresh();
      navigate("/");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    navigate("/");
  };

  return (
    <div className="add-modal-overlay" onClick={handleCancel}>
      <div className="add-modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">
          {isEditing ? "EDIT NOTE" : "NEW NOTE"}
        </h2>

        <input
          type="text"
          className="modal-input"
          placeholder="New note..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        <textarea
          className="modal-textarea"
          placeholder="Add description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
        />

        <div className="modal-actions">
          <button className="btn-cancel" onClick={handleCancel}>
            CANCEL
          </button>
          <button className="btn-apply" onClick={submit}>
            {isEditing ? "UPDATE" : "APPLY"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;