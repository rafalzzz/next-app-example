import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "store";

interface SignUpState {
  isOpen: boolean;
}

const initialState: SignUpState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export const selectModalIsOpen = (state: RootState) => state.modal.isOpen;

export default modalSlice.reducer;
