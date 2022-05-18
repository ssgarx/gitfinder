import React from "react";
import { useRef } from "react";

import RepoBox from "./RepoBox";

import styles from "./ResultBox.module.scss";

function ResultBox({ results, setPage }) {
  const listInnerRef = useRef();

  const onScroll = async () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (Math.ceil(scrollTop + clientHeight) === scrollHeight) {
        setPage((page) => page + 1);
      }
    }
  };

  return (
    <div
      onScroll={onScroll}
      ref={listInnerRef}
      className={styles.resultBoxBox1}
    >
      {results.map((repo, index) => {
        return <RepoBox repo={repo} key={index} />;
      })}
    </div>
  );
}

export default ResultBox;
