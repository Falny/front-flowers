import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

type Catalog = {
  catalog: String[];
};
type Light = {
  light: String[];
};
type Color = {
  color: String[];
};
type Format = {
  format: String[];
};
type Structura = {
  structura: String[];
};

interface SortsState {
  catalog: Catalog[];
  light: Light[];
  color: Color[];
  format: Format[];
  structura: Structura[];
  status: String;
  error: String | undefined;
}

export const FetchSorts = createAsyncThunk<
  {
    catalog: Catalog[];
    lights: Light[];
    colors: Color[];
    formats: Format[];
    flowers: Structura[];
  },
  void
>("sorts/fetchSorts", async () => {
  try {
    const data = await instance.get(`/sort`).then((res) => res.data);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

const initialState: SortsState = {
  catalog: [],
  light: [],
  color: [],
  format: [],
  structura: [],
  status: "loading",
  error: "",
};

const SortsSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchSorts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchSorts.fulfilled, (state, action) => {
        state.status = "success";
        state.catalog = action.payload.catalog;
        state.light = action.payload.lights;
        state.color = action.payload.colors;
        state.format = action.payload.formats;
        state.structura = action.payload.flowers;
      })
      .addCase(FetchSorts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default SortsSlice.reducer;
