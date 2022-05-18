import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveFavourites } from "../redux/favouriteSlice";

import saveIconUnselected from "../assets/icons/saveIconUnselected.svg";
import saveIconSelected from "../assets/icons/saveIconSelected.svg";
import lockIcon from "../assets/icons/lockIcon.svg";
import unlockIcon from "../assets/icons/unlockIcon.svg";
import starIcon from "../assets/icons/starIcon.svg";
import languageIcon from "../assets/icons/languageIcon.svg";

import styles from "./RepoBox.module.scss";

function RepoBox({ repo }) {
  const favs = useSelector((state) => state.favourites.value);
  const dispatch = useDispatch();
  const handleRepoClick = (url) => {
    window.open(url, "_blank").focus();
  };

  const returnLastUpdated = (input) => {
    let myArr = input.split("T")[0].split("-");
    return `${myArr[2]}/${myArr[1]}/${myArr[0]}`;
  };
  return (
    <div className={styles.repoBoxBox1}>
      <div
        onClick={() => handleRepoClick(repo?.html_url)}
        className={styles.rbbLeft}
      >
        <p className={styles.repoName}>{repo?.full_name}</p>
        <p className={styles.repoDesc}>{repo?.description}</p>
        <div className={styles.repoData}>
          {repo?.private ? (
            <p>
              <span>
                <img src={lockIcon} alt="lockIcon" />
              </span>{" "}
              status
            </p>
          ) : (
            <p>
              <span>
                <img src={unlockIcon} alt="unlockIcon" />
              </span>{" "}
              status
            </p>
          )}
          <p>
            <span>
              <img src={starIcon} alt="starIcon" />
            </span>
            {repo?.stargazers_count}
          </p>
          {repo?.language && (
            <p>
              <span>
                <img src={languageIcon} alt="languageIcon" />
              </span>
              {repo.language}
            </p>
          )}
          <p> Updated on {returnLastUpdated(repo?.updated_at)}</p>
        </div>
        <p className={styles.repoCreator}>Created by {repo?.owner?.login}</p>
      </div>
      <div className={styles.rbbRight}>
        {favs.some((item) => item.id === repo.id) ? (
          <img
            onClick={() => dispatch(saveFavourites(repo))}
            src={saveIconSelected}
            alt="save icon"
          />
        ) : (
          <img
            onClick={() => dispatch(saveFavourites(repo))}
            src={saveIconUnselected}
            alt="save icon"
          />
        )}
      </div>
    </div>
  );
}

export default RepoBox;
