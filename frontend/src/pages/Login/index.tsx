import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.svg";
import { useAuthStore } from "@/stores/auth";
import { Icon } from "@/components/ui/icon";
import { toast } from "sonner";
import { loginSchema } from "@/types/auth";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = loginSchema.parse({
        email,
        password,
      });
      await login(validatedData);
    } catch (error) {
      console.error(error);
      toast.error("Falha ao realizar o login!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 ">
      <Link to="/" className="mb-10 flex items-center gap-0">
        <img src={logo} alt="Financy" className="h-8 w-auto" />
      </Link>

      <div className="w-full max-w-[400px] rounded-xl border border-gray-200 bg-neutral-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-xl font-semibold text-gray-800">Fazer login</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Entre na sua conta para continuar
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input
            label="E-mail"
            type="email"
            placeholder="mail@exemplo.com"
            leftIcon={<Icon id="mail" className="size-4" />}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Senha"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            leftIcon={<Icon id="lock" className="size-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="rounded p-0.5 text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-base focus-visible:ring-offset-1"
              >
                {showPassword ? (
                  <Icon id="eye-closed" className="size-4" />
                ) : (
                  <Icon id="eye" className="size-4" />
                )}
              </button>
            }
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between gap-4">
            <label
              className={cn(
                "flex cursor-pointer items-center gap-2 text-sm text-gray-700",
                "focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-base focus-within:ring-offset-2 focus-within:rounded",
              )}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="size-4 rounded border-gray-300 text-brand-base transition-colors focus:ring-brand-base"
              />
              Lembrar-me
            </label>
            <Link to="/" className="text-sm">
              Recuperar senha
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            Entrar
          </Button>

          <div className="flex items-center py-2">
            <span className="w-full border-t border-gray-200" />
            <span className="bg-neutral-white px-3 text-sm text-gray-500">
              ou
            </span>
            <span className="w-full border-t border-gray-200" />
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-sm text-gray-500">Ainda não tem uma conta?</p>
          </div>

          <Link
            to="/register"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-base focus-visible:ring-offset-2"
          >
            <Icon id="user-round-plus" className="size-4" />
            Criar conta
          </Link>
        </form>
      </div>
    </div>
  );
}
