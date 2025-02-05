"use client";
import { Input, Button, Logo } from "@/ui";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <ProtectedRoute redirectToDashboard>
      <div className="flex flex-col items-center justify-center h-screen w-full gap-4 relative">
        <Logo square />
        <div className="text-center">
          <h1 className="text-2xl font-bold">Inicio de sesión</h1>
          <p className="text-sm text-gray-400">
            Bienvenido de nuevo, ingresa tus datos
          </p>
        </div>
        <form
          className="flex flex-col items-center justify-center space-y-4 w-1/4 z-10"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            placeholder="Email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            className="w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="gradient" className="w-full" type="submit">
            Iniciar sesión
          </Button>
        </form>
        <p className="text-sm text-gray-700 absolute inset-x-0 bottom-10 text-center">
          v1.0.0
        </p>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary-500/20 to-transparent" />
      </div>
    </ProtectedRoute>
  );
};

export default Login;
