import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type { RootState, AppDispatch } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
//export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
//export const useAppSelector = useSelector.withTypes<RootState>();

// Define `useAppDispatch` como un hook tipado
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Define `useAppSelector` como un hook tipado
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;