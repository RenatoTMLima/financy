import { NavLink } from "react-router-dom";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.svg";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/transacoes", label: "Transações" },
  { to: "/categorias", label: "Categorias" },
] as const;

export function Header() {
  return (
    <header className="flex h-14 w-full items-center justify-between gap-6 bg-gray-800 px-6">
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
                "text-sm font-medium no-underline transition-colors hover:text-white",
                isActive ? "text-white" : "text-gray-400"
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="flex shrink-0 items-center">
        <div
          className="flex size-9 items-center justify-center rounded-full border border-gray-600 bg-gray-200 text-sm font-medium text-gray-700"
          aria-hidden
        >
          CT
        </div>
      </div>
    </header>
  );
}
