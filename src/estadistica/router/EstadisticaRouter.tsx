import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { GraficosPage } from "../pages/GraficosPage";

export const EstadisticaRouter = () => {
  return (
    <Routes>
      <Route path="graficos" Component={GraficosPage} />
      <Route path="*" element={<Navigate to="graficos" />} />
    </Routes>
  );
};
