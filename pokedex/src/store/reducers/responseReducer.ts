import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ResponseHandler } from "../../types";

const initialState: ResponseHandler = {
  isLoading: true,
  status: 0,
  pokeApi: undefined,
  message: "",
};

export const Responsehandler = createSlice({
  name: "pokeApiHandlerResponse",
  initialState: initialState,
  reducers: {
    getPokeApi: (state, action: PayloadAction<ResponseHandler>) => {
      const errorCode = [404, 500, 501, 502, 503, 504, 505];
      const { status } = action.payload;
      if (status !== undefined) {
        switch (status) {
          case 200:
            return { ...action.payload };
          case errorCode.find((value) => value === status):
            return { ...action.payload };
          default:
            throw new Error(`Invalid status ${status}`);
        }
      }
    },
  },
});

export const { getPokeApi } = Responsehandler.actions;

export default Responsehandler.reducer;
