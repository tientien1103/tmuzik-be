import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  artists: [],
  artist: {},
  songs: [],
};

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getArtistsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.artists = action.payload.data.artists;
      const { count } = action.payload.data;

      state.totalartists = count;
    },
    getSingleArtistSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.artist = action.payload.data;
    },
    getSongsByArtistSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.songs = action.payload.data.songs;
    },
  },
});

const {
  startLoading,
  hasError,
  getArtistsSuccess,
  getSingleArtistSuccess,
  getSongsByArtistSuccess,
} = artistSlice.actions;

export const getArtists =
  ({ page, limit, filterName }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const res = await apiService.get(`/artists`, { params });
      // if (page === 1) dispatch(resetPosts());
      dispatch(getArtistsSuccess(res.data));
    } catch (error) {
      dispatch(hasError(error.message));
    }
  };

export const getSingleArtist =
  ({ artistId }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const res = await apiService.get(`/artists/${artistId}`);
      dispatch(getSingleArtistSuccess(res.data));
    } catch (error) {
      dispatch(hasError(error.message));
    }
  };

export const getSongsByArtist =
  ({ page, limit, artistId }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const params = { page, limit, artistId };
      const res = await apiService.get(`/artists/${artistId}/songs`, {
        params,
      });
      // if (page === 1) dispatch(resetPosts());
      dispatch(getSongsByArtistSuccess(res.data));
    } catch (error) {
      dispatch(hasError(error.message));
    }
  };

export default artistSlice.reducer;
