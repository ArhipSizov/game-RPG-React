import { createSlice } from "@reduxjs/toolkit";
import type allData from "../TypeAllData";

const slice = createSlice({
  name: "allData",
  initialState: {
    allData: [],
  },
  reducers: {
    addAllData(state: allData, action) {
      state.allData.push({
        id: new Date().toISOString(),
        name: action.payload.name,
      });
    },
  },
});

export const { addAllData } = slice.actions;

export default slice.reducer;
