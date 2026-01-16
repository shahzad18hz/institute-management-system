import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

const Login = lazy(() => import("./components/auth/Login"));
const AdminDashboard = lazy(() => import("./components/Admin/AdminDashboard"));

const Loader = () => <div>Loading...</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/admindashboard",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <AdminDashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />, // unknown URL → login
  },
]);

export default router;
