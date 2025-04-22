import React, { useState } from "react";
import styles from "./EditTodoForm.module.css";
import { Todo } from "@/types/categoryTypes";

interface EditTodoFormProps {
  todo: Todo;
  onSave: (updatedTodo: Todo) => void;
  onCancel: () => void;
  todos: Todo[];
  onToggleComplete: (id: string) => void;
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({
  todo,
  onSave,
  onCancel,
  todos,
  onToggleComplete,
}) => {
  const [name, setName] = useState<string>(todo.name);
  const [description, setDescription] = useState<string>(
    todo.description || ""
  );
  const [completed, setCompleted] = useState<boolean>(todo.completed);

  const handleSave = () => {
    if (name.trim() === "") {
      alert("Name cannot be empty");
      return;
    }
    onSave({ ...todo, name, description, completed });
  };

  return (
    <div className={styles.editContainer}>
      <div className={styles.buttonGroup}>
        <button onClick={handleSave}>Save Changes</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Todo Name"
      />
      <div className={styles.checkbox}>
        <input
          className={styles.spaceBetweenElements}
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted(!completed)}
        />
        <label htmlFor="checkbox">Done</label>
      </div>
      <textarea
        className={styles.spaceBetweenElements}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
      />
    </div>
  );
};

export default EditTodoForm;
