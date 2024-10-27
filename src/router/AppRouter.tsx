import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Chat } from "../components/chat/Chat";
import { Appbar } from "../shared/components/Appbar/Appbar";
import { AuthRouter } from "../auth/router/AuthRouter";

export const AppRouter = () => {
  const location = useLocation();
  return (
    <>
      {!location.pathname.includes("auth") && <Appbar />}
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<AuthRouter />} path="/auth/*" />
        <Route element={<Chat />} path="/chat" />
        <Route element={<Navigate to="/" replace />} path="*" />
      </Routes>
    </>
  );
};
