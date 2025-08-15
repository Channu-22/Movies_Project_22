
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../url";

export const fetchData = createAsyncThunk(
  "movies/fetchData",
  async ({ urls, key }, { rejectWithValue }) => {
    try {
      const promises = urls.map((url) => axios.get(url));
      const response = await Promise.all(promises);
      return { key, data: response.map((obj) => obj.data) };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleData = createAsyncThunk(
  "movies/fetchSingleData",
  async (pathArr, { rejectWithValue }) => {
    try {
      const [type, id] = pathArr; // e.g., ["movie", "123"] or ["tv", "456"]
      const apiKey = import.meta.env.VITE_TMDB_APIKEY;
      const url = `${BASE_URL}${type}/${id}?api_key=${apiKey}&append_to_response=credits`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async (url, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPopularTV = createAsyncThunk(
  "movies/fetchPopularTV",
  async (url, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    loading: false,
    error: null,
    data: {}, // For Row.jsx data
    singleMovie: null, // For Single.jsx data
    popularMovies: null, // For Movie.jsx data
    popularTV: null, // For TV.jsx data
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchData (for Row.jsx)
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data[action.payload.key] = action.payload.data;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchSingleData (for Single.jsx)
      .addCase(fetchSingleData.pending, (state) => {
        state.loading = true;
        state.singleMovie = null;
      })
      .addCase(fetchSingleData.fulfilled, (state, action) => {
        state.loading = false;
        state.singleMovie = action.payload;
      })
      .addCase(fetchSingleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.singleMovie = null;
      })
      // Handle fetchPopularMovies (for Movie.jsx)
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.popularMovies = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.popularMovies = null;
      })
      // Handle fetchPopularTV (for TV.jsx)
      .addCase(fetchPopularTV.pending, (state) => {
        state.loading = true;
        state.popularTV = null;
      })
      .addCase(fetchPopularTV.fulfilled, (state, action) => {
        state.loading = false;
        state.popularTV = action.payload;
      })
      .addCase(fetchPopularTV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.popularTV = null;
      });
  },
});

export const movieReducer = movieSlice.reducer;
