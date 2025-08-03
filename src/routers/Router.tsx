import { Route, Routes } from "react-router-dom";
import HomeControl from "../pages/HomeControl";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<HomeControl />} />
      </Route>
    </Routes>
  );
}
