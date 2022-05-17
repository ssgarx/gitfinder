import React from "react";
import { useRef } from "react";
import RepoBox from "./RepoBox";
import styles from "./ResultBox.module.scss";

function ResultBox({ results, setPage, localResults, location }) {
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
      onScroll={() => {
        if (location === "home") {
          console.log("location", location);
          onScroll();
        }
      }}
      ref={listInnerRef}
      className={styles.resultBoxBox1}
    >
      {(location = "favourites"
        ? localResults?.length > 0
          ? localResults
          : results
        : results).map((repo, index) => {
        return <RepoBox repo={repo} key={index} />;
      })}
    </div>
  );
}

export default ResultBox;
