import { createSlice } from "@reduxjs/toolkit";

export const favouriteSlice = createSlice({
  name: "favourites",
  initialState: {
    value: [],
  },
  reducers: {
    saveFavourites: (state, action) => {
      let localSavedFavourites = localStorage.getItem("favourites");
      if (localSavedFavourites) {
        let newFavourite = [];
        if (!state.value.some((item) => item.id === action.payload.id)) {
          newFavourite = [...JSON.parse(localSavedFavourites), action.payload];
        } else {
          newFavourite = state.value.filter(
            (item) => item.id !== action.payload.id
          );
        }

        localStorage.setItem("favourites", JSON.stringify(newFavourite));
        state.value = newFavourite;
      } else {
        localStorage.setItem("favourites", JSON.stringify([action.payload]));
        state.value = [action.payload];
      }
    },
    fetchSavedFavourites: (state) => {
      let localSavedFavourites = localStorage.getItem("favourites");
      if (localSavedFavourites) {
        state.value = JSON.parse(localSavedFavourites);
      } else {
        state.value = [];
      }
    },
  },
});

export const { saveFavourites, fetchSavedFavourites } = favouriteSlice.actions;

export default favouriteSlice.reducer;
