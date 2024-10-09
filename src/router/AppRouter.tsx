import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Chat } from "../components/chat/Chat";
import { Appbar } from "../shared/components/Appbar/Appbar";

export const AppRouter = () => {
  return (
    <>
      <Appbar />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<Chat />} path="/chat" />
      </Routes>
    </>
  );
};
