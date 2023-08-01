import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
// import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  songs: [],
};

const topChartSlice = createSlice({
  name: "topChart",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getTopChartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { count } = action.payload.data;
      state.songs = action.payload.data.songs;

      state.totalSongs = count;
    },
    // sendSongReactionSuccess(state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   const { postId, reactions } = action.payload;
    //   state.postsById[postId].reactions = reactions;
    // },
    // tranh loi don post
    // resetSongs(state, action) {
    //   state.songs = [];
    // },
  },
});

const { startLoading, hasError, getTopChartSuccess } = topChartSlice.actions;

export const getTopChart =
  ({ page, limit = 10 }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const params = { page, limit };
      const res = await apiService.get(`/charts`, {
        params,
      });
      dispatch(getTopChartSuccess(res.data));
    } catch (error) {
      dispatch(hasError(error.message));
    }
  };

export default topChartSlice.reducer;
