import React from "react";

import searchIcon from "../assets/icons/searchIcon.svg";
import closeIcon from "../assets/icons/closeIcon.svg";
import filterIcon from "../assets/icons/filterIcon.svg";

import styles from "./SearchBox.module.scss";

function SearchBox({
  searchedText,
  setSearchedText,
  setResults,
  setPage,
  location,
  setLocalResults,
}) {
  return (
    <div className={styles.searchBoxBox1}>
      <div>
        {location === "home" ? (
          <img src={searchIcon} alt="searchIcon" />
        ) : (
          <img src={filterIcon} alt="filterIcon" />
        )}
      </div>
      <div>
        <input
          autoFocus={true}
          autoComplete="off"
          type="text"
          placeholder={
            location === "home"
              ? "search here for any repo..."
              : "searcg here for saved repo..."
          }
          value={searchedText}
          onChange={(e) => setSearchedText(e.target.value)}
        />
      </div>
      <div>
        {searchedText && (
          <img
            src={closeIcon}
            alt="closeIcon"
            onClick={() => {
              setSearchedText("");
              if (location === "home") {
                setPage(1);
                setResults([]);
              } else {
                setLocalResults([]);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default SearchBox;
