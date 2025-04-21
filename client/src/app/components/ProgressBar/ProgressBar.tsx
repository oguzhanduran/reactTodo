import React from "react";
import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  progress: number;
  label: string | undefined;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label }) => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressLabel}>
        <span>{label}</span>
        <span>{`${progress}%`}</span>
      </div>
      <div className={styles.progressBarBackground}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
