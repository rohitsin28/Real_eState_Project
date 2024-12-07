import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScrapingState {
  isLoading: boolean;
  data: any | null;
  isError: boolean;
}

const initialState: ScrapingState = {
  isLoading: false,
  data: null,
  isError: false,
};

export const fetchScrapingData = createAsyncThunk(
  'scrapingData/fetchScrapingData',
  async (cityName: string) => {
    const response = await fetch(`http://localhost:3000/api/scraping?city=${cityName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for city: ${cityName}`);
    }
    return response.json();
  }
);

const scrapingDataSlice = createSlice({
  name: 'scrapingData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchScrapingData.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchScrapingData.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchScrapingData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.error('Error fetching data:', action.error.message);
    });
  },
});

export default scrapingDataSlice.reducer;
