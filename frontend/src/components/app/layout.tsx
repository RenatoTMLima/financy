import { useAuthStore } from "@/stores/auth";
import { Header } from "./header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isAuth = useAuthStore((store) => store.isAuthenticated);

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuth ? <Header /> : null}
      <main className={cn("mx-auto px-16", isAuth ? "py-4" : "")}>
        {children}
      </main>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
