import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

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
interface ErrorPayload {
  message?: string;
  [key: string]: unknown; // Permite otros campos en caso de que el error contenga más información
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
// Thunk para crear un nuevo hecho
export const crearHecho = createAsyncThunk(
    "verificandoUy/crearHecho",
    async (hechoData: { nombre: string; descripcion: string; categoria: string }, { getState, rejectWithValue }) => {
      const state = getState() as RootState;
      const token = state.verificandoUy.usuario.token; // Suponiendo que el token está en este estado

      try {
        const response = await axios.post("http://localhost:8080/api/hechos/create", hechoData, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Añade el token en el encabezado de autorización
          },
        });
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue({ message: "Error desconocido" });
        }
      }
    }
);
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
  extraReducers: (builder) => {
    builder
        .addCase(crearHecho.pending, (state) => {
          state.isLoading = true;
          state.error.isError = false;
          state.success.isSuccess = false;
        })
        .addCase(crearHecho.fulfilled, (state) => {
          state.isLoading = false;
          state.success.isSuccess = true;
          state.success.successMessage = "Hecho creado exitosamente";
        })
        .addCase(crearHecho.rejected, (state, action) => {
          state.isLoading = false;
          state.error.isError = true;
          const errorPayload = action.payload as ErrorPayload;
          state.error.errorMessage = errorPayload.message || "Error al crear el hecho";
        });
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
