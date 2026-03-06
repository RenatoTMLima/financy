import { Mail, User, Pencil, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Account() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-[400px] rounded-xl border border-gray-200 bg-neutral-white p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-center">
          <div
            className="mb-4 flex size-16 items-center justify-center rounded-full border border-gray-300 bg-gray-200 text-xl font-medium text-gray-700"
            aria-hidden
          >
            CT
          </div>
          <h1 className="text-xl font-bold text-gray-800">Conta teste</h1>
          <p className="mt-1 text-sm text-gray-500">conta@teste.com</p>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            label="Nome completo"
            type="text"
            defaultValue="Conta teste"
            leftIcon={<User className="size-4" />}
            rightIcon={
              <span
                className="flex size-6 items-center justify-center rounded-full bg-pink-light text-pink-base"
                aria-hidden
              >
                <Pencil className="size-3" />
              </span>
            }
            autoComplete="name"
          />

          <Input
            label="E-mail"
            type="email"
            defaultValue="conta@teste.com"
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
            leftIcon={<LogOut className="size-4" />}
          >
            Sair da conta
          </Button>
        </form>
      </div>
    </div>
  );
}
