import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { AppRouter } from "./router/AppRouter";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <AppRouter />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </StrictMode>
);

