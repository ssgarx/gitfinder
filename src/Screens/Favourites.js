import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultBox from "../components/ResultBox";
import SearchBox from "../components/SearchBox";
import styles from "./Favourites.module.scss";
import LineLoader from "../components/LineLoader";
import { useSelector, useDispatch } from "react-redux";
import { fetchSavedFavourites } from "../redux/favouriteSlice";

function Favourites() {
  const favs = useSelector((state) => state.favourites.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchedText, setSearchedText] = useState("");
  const [searching, setSearching] = useState(false);
  const [localResults, setLocalResults] = useState([]);

  useEffect(() => {
    favs.length === 0 && dispatch(fetchSavedFavourites());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearching(true);
      const filteredFavs = favs.filter((fav) =>
        fav.full_name.toLowerCase().includes(searchedText.toLowerCase())
      );
      setLocalResults(filteredFavs);
      setSearching(false);
    }, 500);
    searchedText.length === 0 && setLocalResults([]);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedText]);

  return (
    <div className={styles.favouritesBox}>
      <div className={styles.fContent}>
        <div className={styles.fUpper}>
          <div className={styles.fUpperLeft}>
            <p>gitfinder✨</p>
          </div>
          <div className={styles.fUpperRight}>
            <div
              style={{
                backgroundColor: window.location.href.includes("favourite")
                  ? ""
                  : "#2f3f69",
              }}
              onClick={() => navigate("/")}
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
        <div className={styles.fLower}>
          <SearchBox
            searchedText={searchedText}
            setSearchedText={setSearchedText}
            location="favourites"
            setLocalResults={setLocalResults}
          />
        </div>
        {searching && <LineLoader />}
        {(favs?.length > 0 || localResults?.length) > 0 && (
          <ResultBox
            results={favs}
            localResults={localResults}
            location="favourites"
          />
        )}
      </div>
    </div>
  );
}

export default Favourites;
