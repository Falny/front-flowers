import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

type Card = {
  _id: string;
  img: string;
  title: string;
  price: number;
  oldPrice?: number;
  sale?: boolean;
  new?: boolean;
  structura: string[];
  format: string;
  imgArchive: string[];
  color: string[];
  light: string;
  catalog: string[];
};

interface CardState {
  cards: Card[];
  status: string;
  error: string | undefined;
}

export type FetchFilter = {
  categories: string[] | string;
  light: string[] | string;
  color: string[] | string;
  format: string[] | string;
  flowers: string[] | string;
};

export const FetchCards = createAsyncThunk<
  {
    cards: Card[];
  },
  FetchFilter
>("cards/fetchCards", async (params) => {
  try {
    const { categories, light, color, format, flowers } = params;
    const data = await instance
      .get(`/cards?categories=${categories}&light=${light}&color=${color}&format=${format}&flowers=${flowers}`)
      .then((res) => res.data);
    return data;
  } catch (err) {
    throw err;
  }
});

const initialState: CardState = {
  cards: [],
  status: "loading",
  error: "",
};

const CardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchCards.pending, (state) => {
        state.status = "loading";
        state.cards = [];
      })
      .addCase(FetchCards.fulfilled, (state, action) => {
        state.status = "success";
        state.cards = action.payload.cards;
      })
      .addCase(FetchCards.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
        state.cards = [];
      });
  },
});

export default CardSlice.reducer;
