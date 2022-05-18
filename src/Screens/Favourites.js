import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSavedFavourites, saveFavourites } from "../redux/favouriteSlice";

import exportFromJSON from "export-from-json";

import importIcon from "../assets/icons/importIcon.svg";
import exportIcon from "../assets/icons/exportIcon.svg";

import SearchBox from "../components/SearchBox";
import styles from "./Favourites.module.scss";
import LineLoader from "../components/LineLoader";
import FilterBox from "../components/FilterBox";

function Favourites() {
  const favs = useSelector((state) => state.favourites.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchedText, setSearchedText] = useState("");
  const [searching, setSearching] = useState(false);
  const [localResults, setLocalResults] = useState([]);
  const inputRef = useRef(null);
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
      searchedText.length && setLocalResults(filteredFavs);
      setSearching(false);
    }, 500);
    searchedText.length === 0 && setLocalResults([]);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedText]);

  const handleExportData = () => {
    if (favs.length === 0) {
      alert("No data present");
      return;
    }
    const data = favs;
    const fileName = "download";
    const exportType = exportFromJSON.types.json;

    exportFromJSON({ data, fileName, exportType });
  };

  const handleImportData = async (e) => {
    let file = document.getElementById("file").files[0];
    if (file?.type !== "application/json") {
      alert("Invalid file, only JSON format allowed.");
      return;
    }
    let reader = new FileReader(file);
    reader.readAsText(file);
    reader.onload = async (e) => {
      let content = await JSON.parse(e.target.result);
      content?.forEach((fav) => {
        dispatch(saveFavourites(fav));
      });
    };
  };

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
          <div onClick={() => inputRef.current.click()}>
            <input
              ref={inputRef}
              type="file"
              name="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleImportData}
            />
            <img
              name="submit"
              className={styles.icon}
              src={importIcon}
              alt="importIcon"
            />

            <p className={styles.iconText}>Import</p>
          </div>
          <div
            style={{
              opacity: favs.length === 0 ? 0.5 : 1,
              cursor: favs.length === 0 ? "not-allowed" : "pointer",
            }}
            onClick={handleExportData}
          >
            <img className={styles.icon} src={exportIcon} alt="exportIcon" />

            <p className={styles.iconText}>Export</p>
          </div>
        </div>
        {searching && <LineLoader />}
        {(favs?.length > 0 || localResults?.length) > 0 && (
          <FilterBox results={favs} localResults={localResults} />
        )}
      </div>
    </div>
  );
}

export default Favourites;
