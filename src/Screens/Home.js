import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import SearchBox from "../components/SearchBox";
import LineLoader from "../components/LineLoader";
import ResultBox from "../components/ResultBox";

function Home() {
  const [searchedText, setSearchedText] = useState("");
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchedText);
      // Send Axios request here
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchedText]);

  const handleSearch = (textInput) => {
    let perPageValue = 5;
    let pageValue = 1;
    let endpoint = `https://api.github.com/search/repositories?sort=stars&order=desc&per_page=${perPageValue}&page=${pageValue}&q=${textInput}`;
    setSearching(true);
    fetch(endpoint)
      .then((blob) => blob.json())
      .then((response) => {
        setSearching(false);
        console.log("response", response);
      });
  };
  return (
    <div className={styles.homeBox}>
      <div className={styles.hbContent}>
        <div className={styles.hbcUpper}>
          <div className={styles.hbcUpperLeft}>
            <p>gitfinder✨</p>
          </div>
          <div className={styles.hbcUpperRight}>
            <div
              style={{
                backgroundColor: window.location.href.includes("favourite")
                  ? ""
                  : "#2f3f69",
              }}
            >
              <p>home</p>
            </div>
            <div
              style={{
                backgroundColor: window.location.href.includes("favourite")
                  ? "#2f3f69"
                  : "",
              }}
            >
              <p>favourites</p>
            </div>
          </div>
        </div>
        <div className={styles.hbcLower}>
          <SearchBox
            searchedText={searchedText}
            setSearchedText={setSearchedText}
          />
        </div>
        {/* <LineLoader /> */}
        <ResultBox />
      </div>
    </div>
  );
}

export default Home;
