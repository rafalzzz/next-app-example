import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "shared/utils/storage";
import type { RootState } from "store";
import { ReducerKeys } from "enums/reducer-keys";

interface SignUpState {
  isOpen: boolean;
}

const initialState: SignUpState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: ReducerKeys.MODAL,
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export const selectModalIsOpen = (state: RootState) => state.modal.isOpen;

const persistConfig = {
  key: ReducerKeys.MODAL,
  storage,
  whitelist: ["isOpen"],
};

const persistedReducer = persistReducer(persistConfig, modalSlice.reducer);

export default persistedReducer;
