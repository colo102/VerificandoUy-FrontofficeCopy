import { createSlice, PayloadAction } from "@reduxjs/toolkit";
/* import type { RootState } from "../store"; */

type Error = {
  isError: boolean;
  errorMessage: string;
};

type Success = {
  isSuccess: boolean;
  successMessage: string;
};

interface UsuarioState {
  token: string;
}

// Define a type for the slice state
interface VerificandoUyState {
  isLoading: boolean;
  error: Error;
  success: Success;
  isUserLogged: boolean;
  usuario: UsuarioState;
}

// Define the initial state using that type
const initialState: VerificandoUyState = {
  isLoading: false,
  error: {
    isError: false,
    errorMessage: "",
  },
  success: {
    isSuccess: false,
    successMessage: "",
  },
  isUserLogged: false,
  usuario: { token: "" },
};

export const verificandoUySlice = createSlice({
  name: "verificandoUy",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loadingOn: (state) => {
      state.isLoading = true;
    },
    loadingOff: (state) => {
      state.isLoading = false;
    },
    addError: (state, action: PayloadAction<{ errorMessage: string }>) => {
      state.error.isError = true;
      state.error.errorMessage = action.payload.errorMessage;
    },
    removeError: (state) => {
      state.error.isError = false;
      state.error.errorMessage = "";
    },
    addSuccess: (state, action: PayloadAction<{ successMessage: string }>) => {
      state.success.isSuccess = true;
      state.success.successMessage = action.payload.successMessage;
    },
    removeSuccess: (state) => {
      state.success.isSuccess = false;
      state.success.successMessage = "";
    },
    addUser: (state, action: PayloadAction<UsuarioState>) => {
      state.isUserLogged = true;
      state.usuario.token = action.payload.token;
    },
    removeUser: (state) => {
      state.isUserLogged = false;
      state.usuario.token = "";
    },
  },
});

export const {
  loadingOn,
  loadingOff,
  addError,
  removeError,
  addSuccess,
  removeSuccess,
  addUser,
  removeUser,
} = verificandoUySlice.actions;

// Other code such as selectors can use the imported `RootState` type
/* export const selectIsLoading = (state: RootState) => state.verificandoUy.isLoading; */

export default verificandoUySlice.reducer;
