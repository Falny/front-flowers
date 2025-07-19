import { createSlice } from "@reduxjs/toolkit";

interface FilterState {
  categories: string[] | string;
  light: string[] | string;
  color: string[] | string;
  format: string[] | string;
  flowers: string[] | string;
}

const initialState: FilterState = {
  categories: [],
  light: [],
  color: [],
  format: [],
  flowers: [],
};

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setLight(state, action) {
      state.light = action.payload;
    },
    setColor(state, action) {
      state.color = action.payload;
    },
    setFormat(state, action) {
      state.format = action.payload;
    },
    setFlowers(state, action) {
      state.flowers = action.payload;
    },
  },
});

export default FilterSlice.reducer;
export const { setCategories, setLight, setColor, setFlowers, setFormat } =
  FilterSlice.actions;
