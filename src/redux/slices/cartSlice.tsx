import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

type Cart = {
  _id: string;
  img: string;
  title: string;
  price: number;
  count: number;
};

type CartPost = {
  img: string;
  title: string;
  price: number;
  count?: number;
};

interface CartState {
  items: Cart[];
  status: string;
}

const initialState: CartState = {
  items: [],
  status: "loading",
};

export const fetchPostCart = createAsyncThunk(
  "cart/fetchAddCart",
  async (product: CartPost) => {
    try {
      const { data } = await instance.post("/cart", product);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  try {
    const { data } = await instance.get("/cart");
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export const FetchDelete = createAsyncThunk(
  "cartDelete/fetchDelete",
  async (id: string) => {
    try {
      await instance.delete("/cart/" + id);
      return id;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const FetchUpdate = createAsyncThunk(
  "cartUpdate/fetchUpdate",
  async ({ id, type }: { id: string; type: string }) => {
    try {
      const { data } = await instance.patch("/cart/" + id, {
        type,
      });
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostCart.fulfilled, (state, action) => {
        state.status = "success";
        const findItem = state.items.findIndex(
          (el) => el._id === action.payload._id
        );
        if (findItem !== -1) {
          state.items[findItem] = action.payload
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchPostCart.rejected, (state) => {
        state.status = "error";
        state.items = [];
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = "error";
        state.items = [];
      })
      .addCase(FetchDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchDelete.fulfilled, (state, action) => {
        state.status = "success";
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(FetchDelete.rejected, (state) => {
        state.status = "error";
        state.items = [];
      })
      .addCase(FetchUpdate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchUpdate.fulfilled, (state, action) => {
        state.status = "success";
        state.items = state.items.map((el) => {
          return el._id === action.payload._id
            ? { ...el, count: action.payload.count }
            : el;
        });
      })
      .addCase(FetchUpdate.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
