import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouter } from "./router/AppRouter";
import "animate.css";
import { principalTheme } from "./theme/principal.theme";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <AppRouter />,
    errorElement: <h2>Pagina no encontrada: 404</h2>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={principalTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);

