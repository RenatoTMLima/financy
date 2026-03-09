import { Dashboard } from "@/pages/Dashboard";
import { Login } from "@/pages/Login";
import { useAuthStore } from "@/stores/auth";
import { Navigate } from "react-router-dom";

export function HomeRoute() {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  if (isAuth) {
    return <Dashboard />;
  }
  return <Login />;
}

export function RouteGuard({
  children,
  isPublic = false,
}: {
  children: React.ReactNode;
  isPublic?: boolean;
}) {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  if ((isPublic && isAuth) || (!isPublic && !isAuth)) {
    return <Navigate to="/" />;
  }
  return children;
}
