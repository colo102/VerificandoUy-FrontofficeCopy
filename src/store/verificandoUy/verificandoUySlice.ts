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
  hechosFiltrados: Hecho[];
  hechosVerificados: Hecho[];
  hechosEnProceso: Hecho[];

}

interface Hecho {
  id: string;
  nombre: string;
  descripcion: string;
  estado: string;
  submitter: string;
  checker: string;
  dateCreated: string
  categoria : string
  seleccionado: boolean;
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
    hechosFiltrados: [],
    hechosEnProceso: [],
    hechosVerificados: [],
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

export const sugerirHecho = createAsyncThunk(
    "verificandoUy/sugerirHecho",
    async (hechoData: { nombre: string; descripcion: string; categoria: string }, { getState, rejectWithValue }) => {
      const state = getState() as RootState;
      const token = state.verificandoUy.usuario.token; // Suponiendo que el token está en este estado

      try {
        const response = await axios.post("http://localhost:8080/api/hechos/suggest", hechoData, {
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

export const fetchHechosConFiltroVerificado = createAsyncThunk(
    "verificandoUy/fetchHechosConFiltroVerificado",
    async (filtros: { estado: string; submitterId: string; checkerId: string }, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const token = state.verificandoUy.usuario.token;

        try {
            const response = await axios.get("http://localhost:8080/api/hechos/filter", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                params: {
                    estado: filtros.estado || undefined,
                    submitterId: filtros.submitterId || undefined,
                    checkerId: filtros.checkerId || undefined,
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

export const fetchHechosConFiltro = createAsyncThunk(
    "verificandoUy/fetchHechosConFiltro",
    async (filtros: { estado: string; submitterId: string; checkerId: string }, { getState, rejectWithValue }) => {
      const state = getState() as RootState;
      const token = state.verificandoUy.usuario.token;

      try {
        const response = await axios.get("http://localhost:8080/api/hechos/filter", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          params: {
            estado: filtros.estado || undefined,
            submitterId: filtros.submitterId || undefined,
            checkerId: filtros.checkerId || undefined,
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

export const fetchHechosPendientes = createAsyncThunk(
    "verificandoUy/fetchHechosPendientes",
    async (_, { getState, rejectWithValue }) => {
      const state = getState() as RootState;
      const token = state.verificandoUy.usuario.token;

      try {
        const response = await axios.get("http://localhost:8080/api/hechos/pendingByChecker", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          return rejectWithValue(error.response.data as ErrorPayload);
        } else {
          return rejectWithValue({ message: "Error desconocido" } as ErrorPayload);
        }
      }
    }
);
export const tomarHecho = createAsyncThunk(
    "verificandoUy/tomarHecho",
    async (hechoId: string, { getState, rejectWithValue }) => {
      const state = getState() as RootState;
      const token = state.verificandoUy.usuario.token;

      try {
        const response = await axios.put(`http://localhost:8080/api/hechos/take/${hechoId}`, null, {
          headers: {
            "Authorization": `Bearer ${token}`,
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
    });

export const publicarHecho = createAsyncThunk(
    "verificandoUy/publicarHecho",
    async (hechoId: string, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const token = state.verificandoUy.usuario.token;

        try {
            const response = await axios.put(`http://localhost:8080/api/hechos/publish/${hechoId}`, null, {
                headers: {
                    "Authorization": `Bearer ${token}`,
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

export const verificarHecho = createAsyncThunk(
    "verificandoUy/verificarHecho",
    async ({ hechoId, justification, score }: { hechoId: string; justification: string; score: number }, { getState, rejectWithValue }) => {
      const state = getState() as RootState;
      const token = state.verificandoUy.usuario.token;

      try {
        const response = await axios.put(`http://localhost:8080/api/hechos/verify/${hechoId}`,
        {
          justification,
              score,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
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
        })
        .addCase(sugerirHecho.pending, (state) => {
          state.isLoading = true;
          state.error.isError = false;
          state.success.isSuccess = false;
        })
        .addCase(sugerirHecho.fulfilled, (state) => {
          state.isLoading = false;
          state.success.isSuccess = true;
          state.success.successMessage = "Hecho sugerido exitosamente";
        })
        .addCase(sugerirHecho.rejected, (state, action) => {
          state.isLoading = false;
          state.error.isError = true;
          const errorPayload = action.payload as ErrorPayload;
          state.error.errorMessage = errorPayload.message || "Error al sugerir el hecho";
        })
        .addCase(fetchHechosConFiltro.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchHechosConFiltro.fulfilled, (state, action) => {
          state.isLoading = false;
          state.success.isSuccess = true;
          state.success.successMessage = "Hechos filtrados cargados";
          state.hechosFiltrados = action.payload; // Suponiendo que agregaste un campo `hechos` en el estado
        })
        .addCase(fetchHechosConFiltro.rejected, (state, action) => {
          state.isLoading = false;
          state.error.isError = true;
          const errorPayload = action.payload as ErrorPayload;
          state.error.errorMessage = errorPayload.message || "Error al cargar los hechos filtrados";

        })
        .addCase(fetchHechosConFiltroVerificado.fulfilled, (state, action) => {
            state.isLoading = false;
            state.success.isSuccess = true;
            state.success.successMessage = "Hechos verificados cargados";
            state.hechosVerificados = action.payload; // Suponiendo que agregaste un campo `hechos` en el estado
        })
        .addCase(fetchHechosConFiltroVerificado.rejected, (state, action) => {
            state.isLoading = false;
            state.error.isError = true;
            const errorPayload = action.payload as ErrorPayload;
            state.error.errorMessage = errorPayload.message || "Error al cargar los hechos verificados";
        })
        .addCase(tomarHecho.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(tomarHecho.fulfilled, (state) => {
          state.isLoading = false;
          state.success.isSuccess = true;
          state.success.successMessage = "Hecho tomado exitosamente";
          // Aquí podrías actualizar el estado de los hechos si fuera necesario
        })
        .addCase(tomarHecho.rejected, (state, action) => {
          state.isLoading = false;
          state.error.isError = true;
          const errorPayload = action.payload as ErrorPayload;
          state.error.errorMessage = errorPayload.message || "Error al tomar el hecho";
        })
        .addCase(publicarHecho.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(publicarHecho.fulfilled, (state) => {
            state.isLoading = false;
            state.success.isSuccess = true;
            state.success.successMessage = "Hecho publicado exitosamente";
            // Aquí podrías actualizar el estado de los hechos si fuera necesario
        })
        .addCase(publicarHecho.rejected, (state, action) => {
            state.isLoading = false;
            state.error.isError = true;
            const errorPayload = action.payload as ErrorPayload;
            state.error.errorMessage = errorPayload.message || "Error al tomar el hecho";
        })
        .addCase(fetchHechosPendientes.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchHechosPendientes.fulfilled, (state, action) => {
          state.isLoading = false;
          state.hechosEnProceso = action.payload;
        })
        .addCase(fetchHechosPendientes.rejected, (state,action) => {
          state.isLoading = false;
          state.error.isError = true;
          const errorPayload = action.payload as ErrorPayload;
          state.error.errorMessage = errorPayload?.message || "Error al cargar los datos";
          //state.error.errorMessage = action.payload?.message ?? "Error desconocido";
        })
        .addCase(verificarHecho.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(verificarHecho.fulfilled, (state) => {
          state.isLoading = false;
          state.success.isSuccess = true;
          state.success.successMessage = "Hecho verificado exitosamente";

        })
        .addCase(verificarHecho.rejected, (state, action) => {
          state.isLoading = false;
          state.error.isError = true;
          const errorPayload = action.payload as ErrorPayload;
          state.error.errorMessage = errorPayload.message || "Error al verificar el hecho";
        })

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
