import React from "react";
import styles from "./RepoBox.module.scss";
import saveIconUnselected from "../assets/icons/saveIconUnselected.svg";
import lockIcon from "../assets/icons/lockIcon.svg";
import unlockIcon from "../assets/icons/unlockIcon.svg";
import starIcon from "../assets/icons/starIcon.svg";
import languageIcon from "../assets/icons/languageIcon.svg";

function RepoBox() {
  let dummyItems = {
    full_name: "marionettejs/backbone.marionette",
    description: "The Backbone Framework",
    visibility: "public",
    private: false,
    stargazers_count: 7108,
    language: "JavaScript",
    html_url: "https://github.com/marionettejs/backbone.marionette",
    updated_at: "2022-05-16T05:57:31Z",
    owner: {
      login: "marionettejs",
    },
  };
  const handleRepoClick = (url) => {
    window.open(url, "_blank").focus();
  };
  return (
    <div
      onClick={() => handleRepoClick(dummyItems?.html_url)}
      className={styles.repoBoxBox1}
    >
      <div className={styles.rbbLeft}>
        <p className={styles.repoName}>{dummyItems?.full_name}</p>
        <p className={styles.repoDesc}>{dummyItems?.description}</p>
        <div className={styles.repoData}>
          {dummyItems?.private ? (
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
            {dummyItems?.stargazers_count}
          </p>
          <p>
            <span>
              <img src={languageIcon} alt="languageIcon" />
            </span>
            {dummyItems?.language}
          </p>
          <p> {dummyItems?.updated_at}</p>
        </div>
        <p className={styles.repoCreator}>
          Created by {dummyItems?.owner?.login}
        </p>
      </div>
      <div className={styles.rbbRight}>
        <img src={saveIconUnselected} alt="save icon" />
      </div>
    </div>
  );
}

export default RepoBox;
