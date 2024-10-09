import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface VerificandoUyState {
  loading: boolean;
}

// Define the initial state using that type
const initialState: VerificandoUyState = {
  loading: false,
};

export const verificandoUySlice = createSlice({
  name: "verificandoUy",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loadingOn: (state) => {
      state.loading = true;
    },
    loadingOff: (state) => {
      state.loading = false;
    },
  },
});

export const { loadingOn, loadingOff } = verificandoUySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.verificandoUy.loading;

export default verificandoUySlice.reducer;
