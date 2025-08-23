
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
      const [type, id] = pathArr;
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

export const searchData = createAsyncThunk(
  "movies/searchData",
  async ({ url, query }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}&query=${encodeURIComponent(query)}`);
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
    data: {},
    singleMovie: null,
    popularMovies: null,
    popularTV: null,
    searchTerm: "",
    searchResults: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      if (!action.payload.trim()) {
        state.searchResults = null; // Clear results when search term is empty
      }
    },
  },
  extraReducers: (builder) => {
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
      })
      .addCase(searchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchData.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.searchResults = null;
      });
  },
});

export const { setSearchTerm } = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
