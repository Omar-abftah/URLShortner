import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import RedirectPage from "../pages/RedirectPage";
import { GuestRoute, ProtectedRoute } from "./guards";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      </Route>

      <Route element={<Layout tone="dark" />}>
        <Route path="login/*" element={<GuestRoute><AuthPage mode="login" /></GuestRoute>} />
        <Route path="signup/*" element={<GuestRoute><AuthPage mode="signup" /></GuestRoute>} />
      </Route>

      <Route path=":code" element={<RedirectPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
