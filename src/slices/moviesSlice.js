import { createSlice } from "@reduxjs/toolkit";

// reducers take object as arguments 
// and extraReducer take function as arguements

const movieSl = createSlice({
    name : "movies",
    initialState: {

    },
    reducers : {}
})

export const movieReducer = movieSl.reducer;