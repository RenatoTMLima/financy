import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.svg";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-12">
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

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            label="E-mail"
            type="email"
            placeholder="mail@exemplo.com"
            leftIcon={<Mail className="size-4" />}
            autoComplete="email"
          />

          <Input
            label="Senha"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            leftIcon={<Lock className="size-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="rounded p-0.5 text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-base focus-visible:ring-offset-1"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            }
            autoComplete="current-password"
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
            <Link to="/recuperar-senha" className="text-sm">
              Recuperar senha
            </Link>
          </div>

          <Button type="submit" className="w-full">
            Entrar
          </Button>

          <div className="relative flex items-center py-2">
            <span className="absolute inset-0 flex items-center" aria-hidden>
              <span className="w-full border-t border-gray-200" />
            </span>
            <span className="relative bg-neutral-white px-3 text-sm text-gray-500">
              ou
            </span>
          </div>

          <Link
            to="/register"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-base focus-visible:ring-offset-2"
          >
            <User className="size-4 shrink-0" />
            Criar conta
          </Link>
        </form>
      </div>
    </div>
  );
}
