import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
  },
  reducers: {
    storeUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {storeUser} = userSlice.actions;

export default userSlice.reducer;
