import { Link } from "react-router-dom";
import { Book, Home, LogOut } from "lucide-react";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 p-6 flex flex-col border-r border-gray-800 min-h-screen">
      <h2 className="text-xl font-bold mb-8 text-blue-400">StudyCircle</h2>

      <nav className="flex flex-col gap-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 hover:text-white text-gray-300"
        >
          <Home size={18} />
          Dashboard
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-2 hover:text-white text-gray-300"
        >
          <Book size={18} />
          My Rooms
        </Link>
      </nav>

      <div className="mt-auto">
        {user && (
          <div className="text-sm text-gray-400 mb-4">
            Logged in as: <span className="text-white">{user.email}</span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
