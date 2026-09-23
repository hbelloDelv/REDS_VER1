import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useState, useEffect } from "react";

import AppShell from "./components/layout/AppShell";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Plots from "./pages/Plots";
import Allocation from "./pages/Allocation";
import Payments from "./pages/Payments";
import Users from "./pages/Users";
import AuditLogs from "./pages/AuditLogs";

export default function App() {

  const [token, setToken] =
    useState(null);

  useEffect(() => {
    setToken(
      localStorage.getItem("token")
    );
  }, []);

  if (!token) {
    return (
      <Routes>
        <Route
          path="*"
          element={<Login />}
        />
      </Routes>
    );
  }

  return (
    <AppShell>
      <Routes>

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/customers"
          element={<Customer />}
        />

        <Route
          path="/plots"
          element={<Plots />}
        />

        <Route
          path="/allocations"
          element={<Allocation />}
        />

        <Route
          path="/payments"
          element={<Payments />}
        />

        <Route
          path="/users"
          element={<Users />}
        />

        <Route
          path="/audit-logs"
          element={<AuditLogs />}
        />

      </Routes>
    </AppShell>
  );
}