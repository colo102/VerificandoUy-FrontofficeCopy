import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Chat } from "../components/chat/Chat";
import { Appbar } from "../shared/components/Appbar/Appbar";
//import {Login} from "@mui/icons-material";
import PrivateRoute from "../components/common/PrivateRoute";
import Register from "../components/common/Register.tsx";
import Login from "../components/common/Login.tsx";
import SubmitterDashboard from "../components/submitter/SubmitterDashboard.tsx";
import AdminDashboard from "../components/admin/AdminDashboard.tsx";
import CheckerDashboard from "../components/checker/CheckerDashboard.tsx";
import CitizenDashboard from "../components/citizen/CitizenDashboard.tsx";



export const AppRouter = () => {
  return (
    <>
      <Appbar />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
          {/* Rutas protegidas */}
        <Route element={<PrivateRoute allowedRoles={['ADMIN']} />}>
            <Route path="/admin" element={<AdminDashboard  />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={['SUBMITTER']} />}>
            <Route path="/submitter" element={<SubmitterDashboard  />} /> {/* Componente de submitter */}
        </Route>

        <Route element={<PrivateRoute allowedRoles={['CHECKER']} />}>
            <Route path="/checker" element={<CheckerDashboard  />} /> {/* Componente de checker */}
        </Route>

        <Route element={<PrivateRoute allowedRoles={['CITIZEN']} />}>
              <Route path="/citizen" element={<CitizenDashboard  />} /> {/* Componente de citizen */}
        </Route>

          {/* Ruta de Chat como ejemplo de ruta pública */}
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
};
