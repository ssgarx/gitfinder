import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./favouriteSlice";

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
  },
});
