import React from "react";
import RepoBox from "./RepoBox";
import styles from "./ResultBox.module.scss";

function ResultBox() {
  return (
    <div className={styles.resultBoxBox1}>
      <RepoBox />
    </div>
  );
}

export default ResultBox;
