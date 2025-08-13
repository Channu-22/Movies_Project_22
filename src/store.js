import {configureStore} from "@reduxjs/toolkit"
import { movieReducer } from "./slices/moviesSlice";


const store = configureStore({
    reducer : {
        movieReducer:movieReducer,
    }
});

export default store;