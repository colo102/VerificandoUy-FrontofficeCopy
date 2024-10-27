import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/AuthLogin";
import { SignupPage } from "../pages/AuthSignup";

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="login" Component={LoginPage} />
      <Route path="signup" Component={SignupPage} />
      <Route path="*" element={<Navigate to="login" />} />
    </Routes>
  );
};
