import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    currentMovie: null as {} | null,
  },
  reducers: {
    setCurrentMovie: (state, movie) => {
      state.currentMovie = movie;
    },
  },
});

export const { setCurrentMovie } = movieSlice.actions;

export default movieSlice.reducer;