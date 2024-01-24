import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'serachList',
  initialState: {
    searchListData: [],
  },
  reducers: {
    setSearchListData: (state, action) => {
      state.searchListData = action.payload;
    },
  },
});

export const {setSearchListData} = appSlice.actions;

export default appSlice.reducer;
