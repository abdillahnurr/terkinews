import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunk for fetching all news
export const fetchNewYorkTimes = createAsyncThunk(
  "news/fetchNewYorkTimes",
  async () => {
    const apiKey = import.meta.env.VITE_NYT_API_KEY_1; // Load API key from environment variables
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=most+popular&begin_date=20240904&end_date=20241004&api-key=${apiKey}`;
    const res = await fetch(url); // Make the API call
    const data = await res.json(); // Parse the JSON response
    return data.response.docs; // Return the news documents as the payload
  }
);

// Async Thunk for fetching Indonesia-specific news
export const fetchIndonesiaNews = createAsyncThunk(
  "news/fetchIndonesiaNews",
  async () => {
    const apiKey = import.meta.env.VITE_NYT_API_KEY_2;
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Indonesia&fq=headline:("Indonesia") AND document_type:("article")&api-key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.response.docs;
  }
);

// Async Thunk for fetching news related to programming
export const fetchProgrammingNews = createAsyncThunk(
  "news/fetchProgrammingNews",
  async () => {
    const apiKey = import.meta.env.VITE_NYT_API_KEY_2;
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=tech&fq=section_name:("Technology")AND document_type:("article")&api-key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(apiKey)
    return data.response.docs;
  }
);

// Async Thunk for fetching news based on a search keyword
export const fetchSearchNews = createAsyncThunk(
  "news/fetchSearchNews",
  async (keyword) => {
    const apiKey = import.meta.env.VITE_NYT_API_KEY_1;
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&fq=section_name:("World")AND document_type:("article")&api-key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.response.docs);
    return data.response.docs;
  }
);

// Slice definition including reducers and extra reducers for handling asynchronous actions
export const newsSlice = createSlice({
  name: "news", // Name of the slice
  initialState: { // Initial state for this slice
    homeNews: [],
    indonesiaNews: [],
    programmingNews: [],
    searchNews: [],
    loading: false,
    error: null,
  },
  reducers: { // Synchronous reducers
    // Additional synchronous actions can be defined here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewYorkTimes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewYorkTimes.fulfilled, (state, action) => {
        state.loading = false;
        state.homeNews = action.payload;
      })
      .addCase(fetchNewYorkTimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchIndonesiaNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIndonesiaNews.fulfilled, (state, action) => {
        state.loading = false;
        state.indonesiaNews = action.payload;
      })
      .addCase(fetchIndonesiaNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchProgrammingNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProgrammingNews.fulfilled, (state, action) => {
        state.loading = false;
        state.programmingNews = action.payload;
      })
      .addCase(fetchProgrammingNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchSearchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.searchNews = action.payload;
      })
      .addCase(fetchSearchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { homeNews, indonesiaNews, programmingNews, searchNews, loading, error } =
  newsSlice.actions;

export default newsSlice.reducer;
