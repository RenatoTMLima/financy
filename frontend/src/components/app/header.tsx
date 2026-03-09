import { NavLink } from "react-router-dom";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.svg";
import { useAuthStore } from "@/stores/auth";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/transactions", label: "Transações" },
  { to: "/categories", label: "Categorias" },
] as const;

export function Header() {
  const { user } = useAuthStore();
  return (
    <header className="flex h-14 w-full items-center justify-between gap-6 bg-neutral-white px-6 py-10 border-b border-gray-200">
      <Link to="/" className="flex shrink-0 items-center gap-0">
        <img src={logo} alt="Financy" className="h-7 w-auto" />
      </Link>

      <nav className="flex items-center gap-8" aria-label="Principal">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              cn(
                "text-sm no-underline transition-colors hover:font-semibold",
                isActive ? "text-brand-base font-semibold" : "text-gray-600",
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <NavLink to="/account" className="flex shrink-0 items-center">
        <div
          className="flex size-9 items-center justify-center rounded-full border border-gray-600 bg-gray-200 text-sm font-medium text-gray-700"
          aria-hidden
        >
          {user?.name.charAt(0)}
        </div>
      </NavLink>
    </header>
  );
}
