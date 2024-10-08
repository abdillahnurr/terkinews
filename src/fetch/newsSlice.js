import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper function to fetch data from API
async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error: ${res.statusText}`);
  }
  const data = await res.json();
  if (!data || !data.response || !data.response.docs) {
    throw new Error("Invalid API response: Missing 'response.docs'");
  }

  return {
    articles: data.response.docs,
    totalPages: data.response.meta?.hits ? Math.ceil(data.response.meta.hits / 10) : 1,
  };
}

function getDateString(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo); // Subtract the number of days
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2); // Ensure month is two digits
  const day = (`0${date.getDate()}`).slice(-2); // Ensure day is two digits
  return `${year}${month}${day}`; // Return in YYYYMMDD format
}

// Async Thunks
export const fetchNewYorkTimes = createAsyncThunk(
  "news/fetchNewYorkTimes",
  async ({ page = 1 }) => {
    const { VITE_NYT_API_KEY_1 } = import.meta.env;
    const begin_date = getDateString(90); 
    const end_date = getDateString(0); 
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=most+popular&begin_date=${begin_date}&end_date=${end_date}&page=${page}&api-key=${VITE_NYT_API_KEY_1}`;
    return await fetchData(url);
  }
);

export const fetchIndonesiaNews = createAsyncThunk(
  "news/fetchIndonesiaNews",
  async ({ page = 1 }) => {
    const { VITE_NYT_API_KEY_1 } = import.meta.env;
    const begin_date = getDateString(1825); // 30 days ago
    const end_date = getDateString(0); // today's date
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Indonesia&fq=headline:("Indonesia")&begin_date=${begin_date}&end_date=${end_date}&page=${page}&api-key=${VITE_NYT_API_KEY_1}`;
    return await fetchData(url);
  }
);

export const fetchProgrammingNews = createAsyncThunk(
  "news/fetchProgrammingNews",
  async ({ page = 1 }) => {
    const { VITE_NYT_API_KEY_2 } = import.meta.env;
    const begin_date = getDateString(30); // 30 days ago
    const end_date = getDateString(0); // today's date
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=tech&fq=section_name:("Technology")&begin_date=${begin_date}&end_date=${end_date}&page=${page}&api-key=${VITE_NYT_API_KEY_2}`;
    return await fetchData(url);
  }
);

export const fetchSearchNews = createAsyncThunk(
  "news/fetchSearchNews",
  async ({ keyword, page = 1 }) => {
    const { VITE_NYT_API_KEY_2 } = import.meta.env;
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&fq=section_name:("World")&page=${page}&api-key=${VITE_NYT_API_KEY_2}`;
    return await fetchData(url);
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
    currentPage: 1, 
    totalPages: 1, 
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
        state.homeNews = action.payload.articles || [];  // Handle missing articles
        state.currentPage = action.meta.arg.page;  // Use the manually tracked page
        state.totalPages = action.payload.totalPages || 1;  // Handle missing totalPages
      })
      .addCase(fetchNewYorkTimes.rejected, (state, action) => {
        console.error('Error fetching news:', action.error);  // Log the actual error
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchIndonesiaNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIndonesiaNews.fulfilled, (state, action) => {
        state.loading = false;
        state.indonesiaNews = action.payload.articles || [];  // Handle missing articles
        state.currentPage = action.meta.arg.page;    // Handle missing page number
        state.totalPages = action.payload.totalPages || 1;  // Handle missing totalPages
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
        state.programmingNews = action.payload.articles || [];  // Handle missing articles
        state.currentPage = action.meta.arg.page;    // Handle missing page number
        state.totalPages = action.payload.totalPages || 1;  // Handle missing totalPages
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
        state.searchNews = action.payload.articles || [];  // Handle missing articles
        state.currentPage = action.meta.arg.page;    // Handle missing page number
        state.totalPages = action.payload.totalPages || 1;  // Handle missing totalPages
      })
      .addCase(fetchSearchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { homeNews, indonesiaNews, programmingNews, searchNews, currentPage, totalPages, loading, error } =
  newsSlice.actions;

export default newsSlice.reducer;
