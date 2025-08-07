import { Link, useLocation } from "react-router-dom";
import ProfileDropdown from "@/components/ProfileDropdown";

interface NavbarProps {
  searchPlaceholder?: string;
}

export default function Navbar({ searchPlaceholder = "Search..." }: NavbarProps) {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/ai-chat", label: "AI Chat" },
    { path: "/study-rooms", label: "Study Rooms" },
    { path: "/tasks", label: "Tasks" },
    { path: "/notes", label: "Notes" },
  ];

  return (
    <header className="px-6 py-4 flex items-center justify-between border-b border-border">
      <div className="flex items-center space-x-8">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground text-lg font-bold">✱</span>
          </div>
          <span className="text-xl font-semibold">StudyCircle AI</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition-colors ${
                location.pathname === item.path
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="bg-muted border border-border rounded-lg px-4 py-2 w-64 text-sm"
          />
        </div>
        <ProfileDropdown />
      </div>
    </header>
  );
}
