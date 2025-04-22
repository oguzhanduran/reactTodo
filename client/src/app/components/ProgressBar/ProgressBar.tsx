import React from "react";
import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  progress: number;
  label: string | undefined;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label }) => {
  const displayProgress = label ? progress : 100;
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressLabel}>
        <span>{label}</span>
        <span>{`${displayProgress}%`}</span>
      </div>
      <div className={styles.progressBarBackground}>
        <div
          className={styles.progressBar}
          style={{ width: `${displayProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
