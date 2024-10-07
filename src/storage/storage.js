import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../fetch/newsSlice";

export default configureStore({
  reducer: {
    news: newsReducer,
  },
});
