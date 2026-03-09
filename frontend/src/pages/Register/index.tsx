import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import logo from "@/assets/logo.svg";
import { useAuthStore } from "@/stores/auth";
import { Icon } from "@/components/ui/icon";
import { toast } from "sonner";
import { registerSchema } from "@/types/auth";

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = useAuthStore((state) => state.signup);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = registerSchema.parse({
        name,
        email,
        password,
      });
      await signup(validatedData);
    } catch (error) {
      console.error(error);
      toast.error("Falha ao realizar o cadastro!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-12">
      <Link to="/" className="mb-10 flex items-center gap-0">
        <img src={logo} alt="Financy" className="h-8 w-auto" />
      </Link>

      <div className="w-full max-w-[400px] rounded-xl border border-gray-200 bg-neutral-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-xl font-semibold text-gray-800">Criar conta</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Comece a controlar suas finanças ainda hoje
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input
            label="Nome completo"
            type="text"
            placeholder="Seu nome completo"
            leftIcon={<Icon id="user-round" className="size-4" />}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            helperText="A senha deve ter no mínimo 8 caracteres"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            Cadastrar
          </Button>

          <div className="flex items-center py-2">
            <span className="w-full border-t border-gray-200" />
            <span className="bg-neutral-white px-3 text-sm text-gray-500">
              ou
            </span>
            <span className="w-full border-t border-gray-200" />
          </div>

          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-gray-500">Já tem uma conta?</p>
            <Link
              to="/"
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-base focus-visible:ring-offset-2"
            >
              <Icon id="log-in" className="size-4" />
              Fazer login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
