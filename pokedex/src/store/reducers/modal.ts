import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "../index";

import { ModalInitialState } from "types";

const initialState: ModalInitialState = {
  isOpen: false,
  pokemon: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.pokemon = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default modalSlice.reducer;
