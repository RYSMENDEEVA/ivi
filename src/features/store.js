import {configureStore} from "@reduxjs/toolkit";
import movies from "./movies/movies"
import oneMovie from "./oneMovie/oneMovie";
import cartoons from "./cartoons/cartoons"
import series from "./serie/series"

export const store = configureStore({
    reducer: {
       movies,
       oneMovie,
       cartoons,
       series
    }
})


