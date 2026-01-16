import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

const Login = lazy(() => import("./components/auth/Login"));
const AdminDashboard = lazy(() =>
  import("./components/Admin/AdminDashboard")
);
const ReceptionistDashboard = lazy(() =>
  import("./components/Receptionist/ReceptionistDashboard")
);

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

  // 🔐 ADMIN ONLY
  {
    path: "/admindashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Suspense fallback={<Loader />}>
          <AdminDashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },

  // 🔐 RECEPTIONIST ONLY
  {
    path: "/receptionistdashboard",
    element: (
      <ProtectedRoute allowedRoles={["receptionist"]}>
        <Suspense fallback={<Loader />}>
          <ReceptionistDashboard />
        </Suspense>
      </ProtectedRoute>
    ),
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
