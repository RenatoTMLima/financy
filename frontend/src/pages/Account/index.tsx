import { Mail, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

export function Account() {
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const { updateUser, logout } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      toast.error("Nome é obrigatório");
      return;
    }
    try {
      await updateUser({ name });
      toast.success("Nome atualizado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar nome");
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-[400px] rounded-xl border border-gray-200 bg-neutral-white p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-center">
          <div
            className="mb-4 flex size-16 items-center justify-center rounded-full border border-gray-300 bg-gray-200 text-xl font-medium text-gray-700"
            aria-hidden
          >
            {user?.name.charAt(0)}
          </div>
          <h1 className="text-xl font-bold text-gray-800">{user?.name}</h1>
          <p className="mt-1 text-sm text-gray-500">{user?.email}</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input
            label="Nome completo"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="size-4" />}
            autoComplete="name"
          />

          <Input
            label="E-mail"
            type="email"
            defaultValue={user?.email || ""}
            leftIcon={<Mail className="size-4" />}
            disabled
            helperText="O e-mail não pode ser alterado"
            autoComplete="email"
          />

          <Button type="submit" className="w-full">
            Salvar alterações
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            leftIcon={<LogOut className="size-4 text-red-base" />}
            onClick={handleLogout}
          >
            Sair da conta
          </Button>
        </form>
      </div>
    </div>
  );
}
