import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

// reducers take object as arguments 
// and extraReducer take function as arguements
//

export const fetchData = createAsyncThunk("fetchData", async(arr) => {

    if(Array.isArray(arr)){
        const promises = [];
        arr.forEach((url) => promises.push(axios.get(url)))
        const response = await Promise.all(promises);
        // console.log(response);
        return response.map(obj => obj.data)
    } 
})


// export const fetchData = createAsyncThunk("fetchData", async (arr) => {
//   if (Array.isArray(arr)) {
//     const promises = [];
//     arr.forEach((url) => promises.push(axios.get(url)));
//     const response = await Promise.all(promises);
//     // console.log(response);
//     // return response.map((obj) => obj.data);
//   }
// });




const movieSl = createSlice({
    name : "movies",
    initialState: {
        loading : true,
        error : null,
        movies : [],
    },
    reducers : {},
    extraReducers:(actionBuilder) => {
        actionBuilder.addCase(fetchData.pending,(state) => {
            state.loading = true;
        });
        actionBuilder.addCase(fetchData.fulfilled, (state, action) =>{
            state.loading = false;
            state.movies = action.payload;
        });
        actionBuilder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const movieReducer = movieSl.reducer;