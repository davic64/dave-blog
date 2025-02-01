"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export default function Dashboard() {
  const { logout } = useAuth();
  return (
    <ProtectedRoute>
      <div>Dashboard</div>
      <button onClick={() => logout()}>Logout</button>
    </ProtectedRoute>
  );
}
