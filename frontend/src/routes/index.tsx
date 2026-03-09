import { Account } from "@/pages/Account";
import { Categories } from "@/pages/Categories";
import { Register } from "@/pages/Register";
import { Transactions } from "@/pages/Transactions";
import { Route, Routes } from "react-router-dom";
import { HomeRoute, RouteGuard } from "./routeGuard";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route
        path="/register"
        element={
          <RouteGuard isPublic>
            <Register />
          </RouteGuard>
        }
      />
      <Route
        path="/transactions"
        element={
          <RouteGuard>
            <Transactions />
          </RouteGuard>
        }
      />
      <Route
        path="/categories"
        element={
          <RouteGuard>
            <Categories />
          </RouteGuard>
        }
      />
      <Route
        path="/account"
        element={
          <RouteGuard>
            <Account />
          </RouteGuard>
        }
      />
    </Routes>
  );
}
