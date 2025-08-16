import {configureStore} from "@reduxjs/toolkit"
import { movieReducer } from "./slices/moviesSlice";
// import { authReducer } from "./slices/authSlice";


const store = configureStore({
    reducer : {
        // auth: authReducer,
        movieReducer:movieReducer,
    }
});

export default store;