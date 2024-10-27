import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { AppRouter } from "./router/AppRouter";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <CssBaseline />
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </StrictMode>
);
