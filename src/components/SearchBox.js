import React from "react";
import styles from "./SearchBox.module.scss";
import searchIcon from "../assets/icons/searchIcon.svg";
import closeIcon from "../assets/icons/closeIcon.svg";

function SearchBox({ searchedText, setSearchedText }) {
  return (
    <div className={styles.searchBoxBox1}>
      <div>
        <img src={searchIcon} alt="searchIcon" />
      </div>
      <div>
        <input
          autoFocus={true}
          autoComplete="off"
          type="text"
          placeholder="search here for any repo..."
          value={searchedText}
          onChange={(e) => setSearchedText(e.target.value)}
        />
      </div>
      <div>
        {searchedText && (
          <img
            src={closeIcon}
            alt="closeIcon"
            onClick={() => setSearchedText("")}
          />
        )}
      </div>
    </div>
  );
}

export default SearchBox;
