import { configureStore } from "@reduxjs/toolkit";
import verificandoUyReducer from "./verificandoUy/verificandoUySlice";
import { verificandoUyApi } from "./apis/verificandoUyBackend/verificandoUyBackend.api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    verificandoUy: verificandoUyReducer,
    [verificandoUyApi.reducerPath]: verificandoUyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(verificandoUyApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
