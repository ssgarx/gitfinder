import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import SearchBox from "../components/SearchBox";
import LineLoader from "../components/LineLoader";
import ResultBox from "../components/ResultBox";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [searchedText, setSearchedText] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchedText && handleSearch(searchedText);
      // Send Axios request here
    }, 500);
    searchedText.length === 0 && setResults([]) && setPage(1);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedText]);

  useEffect(() => {
    if (page > 1) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearch = (textInput = null) => {
    let perPageValue = 5;
    let endpoint = `https://api.github.com/search/repositories?sort=stars&order=desc&per_page=${perPageValue}&page=${page}&q=${
      textInput ?? searchedText
    }`;
    setSearching(true);
    fetch(endpoint)
      .then((blob) => blob.json())
      .then((response) => {
        setSearching(false);
        setResults([...results, ...response.items]);
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
              onClick={() => navigate("/favourites")}
            >
              <p>favourites</p>
            </div>
          </div>
        </div>
        <div className={styles.hbcLower}>
          <SearchBox
            searchedText={searchedText}
            setSearchedText={setSearchedText}
            setResults={setResults}
            setPage={setPage}
            location="home"
          />
        </div>
        {searching && <LineLoader />}
        {results?.length > 0 && (
          <ResultBox results={results} setPage={setPage} location="home" />
        )}
      </div>
    </div>
  );
}

export default Home;
