import React from "react";
import styles from "./Modal.module.css";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
  title: string;
  placeholder?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (inputValue.trim() === "") {
      alert("It cannot be empty");
      return;
    }
    onSave(inputValue);
    setInputValue("");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>{title}</h3>
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className={styles.buttonGroup}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
