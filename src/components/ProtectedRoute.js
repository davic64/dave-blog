"use client";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Spinner } from "@/ui";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children, redirectToDashboard = false }) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (redirectToDashboard && user) {
        redirect("/dashboard");
      } else if (!redirectToDashboard && !user) {
        redirect("/dv-login");
      }
    }
  }, [user, loading, redirectToDashboard]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }

  if (redirectToDashboard && user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
