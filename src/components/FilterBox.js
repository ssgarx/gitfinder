import React from "react";
import RepoBox from "./RepoBox";
import styles from "./ResultBox.module.scss";

function FilterBox({ results, localResults }) {
  return (
    <div className={styles.resultBoxBox1}>
      {(localResults?.length > 0 ? localResults : results).map(
        (repo, index) => {
          return <RepoBox repo={repo} key={index} />;
        }
      )}
    </div>
  );
}

export default FilterBox;
